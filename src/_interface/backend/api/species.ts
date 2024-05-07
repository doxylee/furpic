import { fetchAPI } from "@/utils/fetch";
import { Species } from "../entities/species";

export async function getAllSpecies() {
  return (await fetchAPI({
    method: "GET",
    path: "species",
  })) as Species[];
}
