import axios from "axios";
import { User } from "../entities/user";

export async function getMyUser() {
  try {
    const res = await axios.get("/api/users/me");
    return res.data;
  } catch (e) {
    throw e;
  }
}

export async function searchUsers(query: string): Promise<User[]> {
  try {
    const res = await axios.get(`/api/users?query=${query}`);
    return res.data;
  } catch (e) {
    throw e;
  }
}
