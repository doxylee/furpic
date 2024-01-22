import axios from "axios";
import { User } from "../entities/user";
import clientSettings from "clientSettings";

export async function getMyUser() {
  try {
    const res = await axios.get(`${clientSettings.BACKEND_URL}/users/me`, {
      withCredentials: true,
    });
    return res.data;
  } catch (e) {
    throw e;
  }
}

export async function searchUsers(query: string): Promise<User[]> {
  try {
    const res = await axios.get(
      `${clientSettings.BACKEND_URL}/users?query=${query}`,
    );
    return res.data;
  } catch (e) {
    throw e;
  }
}

export async function searchOnTwitter(username: string) {
  try {
    const res = await axios.get(
      `${clientSettings.BACKEND_URL}/users/searchOnTwitter?username=${username}`,
    );
    return res.data;
  } catch (e) {
    throw e;
  }
}
