import axios from "axios";

export async function getMyUser() {
  try {
    const res = await axios.get("/api/users/me");
    return res.data;
  } catch (e) {
    return null;
  }
}
