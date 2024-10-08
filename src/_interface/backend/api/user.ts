import { ImageCrop } from "@/components/ImageUploadInput";
import { User } from "../entities/user";
import { fetchAPI } from "@/utils/fetch";

export async function getMyUser() {
  return (await fetchAPI({ method: "GET", path: "users/me" })) as User;
}

export async function updateMyUser({
  name,
  username,
  twitterUsername,
  alias,
  bio,
  image,
}: {
  name?: string;
  username?: string;
  twitterUsername?: string;
  alias?: string;
  bio?: string;
  image?: ImageCrop;
}): Promise<User> {
  const formData = new FormData();
  if (image?.image) formData.append("image", image.image);
  formData.append(
    "data",
    JSON.stringify({
      name,
      username,
      twitterUsername,
      alias,
      bio,
      crop: image?.crop,
    }),
  );
  return await fetchAPI({
    method: "PATCH",
    path: `users/me`,
    body: formData,
  });
}

export async function getUsers(
  args: { query?: string; limit?: number; offset?: number } = {},
) {
  return (await fetchAPI({
    method: "GET",
    path: "users",
    query: args,
  })) as { count: number; results: User[] };
}

export async function getUserByIdent(ident: string) {
  return (await fetchAPI({ method: "GET", path: `users/${ident}` })) as User;
}
