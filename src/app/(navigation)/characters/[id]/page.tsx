"use server";

import { redirect } from "next/navigation";

export default async function CharacterPage({
  params,
}: {
  params: { id: string };
}) {
  redirect(`/characters/${params.id}/drawings`);
}
