import { User } from "../entities/user";
import { fetchAPI } from "@/utils/fetch";

export async function getMyUser() {
  return (await fetchAPI({ method: "GET", path: "users/me" })) as User;
}

export async function updateMyUser({
  name,
  username,
  bio,
  image,
}: {
  name?: string;
  username?: string;
  bio?: string;
  image?: File;
}): Promise<User> {
  const formData = new FormData();
  if (image) formData.append("image", image);
  formData.append("data", JSON.stringify({ name, username, bio }));
  return await fetchAPI({
    method: "PATCH",
    path: `users/me`,
    body: formData,
  });
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
