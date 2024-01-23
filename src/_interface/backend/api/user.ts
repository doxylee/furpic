import { User } from "../entities/user";
import { fetchAPI } from "@/utils/fetch";

export async function getMyUser() {
  return fetchAPI({ method: "GET", path: "users/me" });
}

export async function searchUsers(query: string): Promise<User[]> {
  return fetchAPI({ method: "GET", path: "users", query: { query } });
}
