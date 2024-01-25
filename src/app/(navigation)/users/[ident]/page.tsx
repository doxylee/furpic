"use server";

import { redirect } from "next/navigation";

export default async function CharacterPage({
  params,
}: {
  params: { ident: string };
}) {
  redirect(`/users/${params.ident.replace(/%40/, "@")}/drawings`);
}
