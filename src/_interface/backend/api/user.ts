import { User } from "../entities/user";
import { fetchAPI } from "@/utils/fetch";

export async function getMyUser() {
  return (await fetchAPI({ method: "GET", path: "users/me" })) as User;
}

export async function searchUsers(query: string) {
  return (await fetchAPI({
    method: "GET",
    path: "users",
    query: { query },
  })) as User[];
}

export async function getUserByIdent(ident: string) {
  return (await fetchAPI({ method: "GET", path: `users/${ident}` })) as User;
}
