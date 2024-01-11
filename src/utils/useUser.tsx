import React, { useContext, useEffect, useMemo, useReducer } from "react";
import { Base64 } from "js-base64";
import { getMyUser } from "@/_interface/backend/api/user";
import { loginOAuth } from "@/_interface/backend/api/oauth";
import clientSettings from "clientSettings";
import { User } from "@/_interface/backend/entities/user";
import { setCookie } from "./cookie";

const propertyFields: (keyof UserController)[] = ["user"];

const methodFields: (keyof UserController)[] = [ "clone", "fetchUser", "logout", "startOAuth", "loginFromOAuthCallback"];

class UserController {
    forceUpdate: (() => void) | null = null;
    user?: User | null;

    private static getOAuthRedirectUrl() {
        return `${window.location.origin}/oauth/callback`;
    }

    clone() {
        const instance = {} as any;

        for (const property of propertyFields) {
            if (typeof this[property] === "object" && this[property] != null)
                instance[property] = Object.assign(Array.isArray(this[property]) ? [] : {}, this[property]);
            else instance[property] = this[property];
        }

        methodFields.forEach((field) => (instance[field] = (this[field] as Function).bind(this)));

        return instance;
    }

    async fetchUser() {
        try {
            this.user = await getMyUser();
            this.forceUpdate?.();
            return true;
        } catch (e) {
            // TODO: handle errors
            this.user = null;
            this.forceUpdate?.();
            return false;
        }
    }

    logout() {
        localStorage.removeItem("token");
        setCookie("jwt", "", new Date());
        setCookie("ref", "", new Date());
        this.user = null;
        this.forceUpdate?.();
    }

    async startOAuth() {
        const code_verifier = Math.random().toString().slice(2);
        const state = Math.random().toString().slice(2);
        const code_challenge = Base64.encodeURL(
            // @ts-ignore
            new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(code_verifier)))
        );
        const params = {
            response_type: "code",
            client_id: clientSettings.TWITTER_OAUTH_CLIENT_ID,
            redirect_uri: UserController.getOAuthRedirectUrl(),
            scope: encodeURIComponent("tweet.read users.read"),
            state,
            code_challenge,
            code_challenge_method: "S256",
        };
        const queryString = Object.entries(params)
            .map(([k, v]) => `${k}=${v}`)
            .join("&");
        const url = "https://twitter.com/i/oauth2/authorize?" + queryString;
        localStorage.setItem("verifier", code_verifier);
        localStorage.setItem("oauth_state", state);
        document.location = url;
    }

    async loginFromOAuthCallback(state: string, code: string) {
        const codeVerifier = localStorage.getItem("verifier");

        if (state !== localStorage.getItem("oauth_state") || !codeVerifier) {
            this.clearLocalStorage();
            throw new Error("State mismatch")
        }

        try {
            await loginOAuth({ code, codeVerifier, redirectUrl: UserController.getOAuthRedirectUrl() });
            await this.fetchUser();
            return true;
        } catch (e: any) {
            if(e.name == 'Network Error') throw new Error("Network error") // TODO: interface 단에서 처리
            throw e;
        } finally {
            this.clearLocalStorage();
        }
    }

    private clearLocalStorage() {
        localStorage.removeItem("verifier");
        localStorage.removeItem("oauth_state");
    }
}

export const userSingleton = new UserController();

const UserContext = React.createContext<UserController>(userSingleton);

export function UserContextProvider({ children }: { children: React.ReactChild | React.ReactChild[] }): React.ReactElement {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    useEffect(() => {
        userSingleton.forceUpdate = forceUpdate;
        userSingleton.fetchUser();
    }, []);
    const memoized = useMemo(() => {
        return userSingleton.clone(); // TODO: Why clone?
    }, [userSingleton.user]);

    return <UserContext.Provider value={memoized}>{children}</UserContext.Provider>;
}

export function useUser() {
    return useContext(UserContext);
}