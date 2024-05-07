import { getAllSpecies } from "@/_interface/backend/api/species";
import { Species } from "@/_interface/backend/entities/species";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type ComputedSpecies = Species & {
  parent: ComputedSpecies | null;
  children: ComputedSpecies[];
  level: number;
};

let speciesMap: Record<string, ComputedSpecies> | undefined = undefined;
let speciesList: ComputedSpecies[] | undefined = undefined;

export function useSpecies() {
  const { data } = useQuery({
    queryKey: ["species", "all"],
    queryFn: getAllSpecies,
    staleTime: Infinity,
  });

  if (data && !speciesMap) {
    speciesMap = {};
    speciesList = [];
    const tempSpeciesList: ComputedSpecies[] = [];

    // Make ComputedSpecies instances
    data.forEach((species) => {
      tempSpeciesList.push({
        ...species,
        parent: null,
        children: [],
        level: 0,
      });
      speciesMap![species.id] = tempSpeciesList[tempSpeciesList!.length - 1];
    });

    // Add to map and set parent/children
    tempSpeciesList!.forEach((species) => {
      if (species.parentId) {
        const parent = speciesMap![species.parentId];
        species.parent = parent;
        parent.children.push(species);
      }
    });

    // Set level and add to list using DFS
    const stack = tempSpeciesList.filter((species) => !species.parent);
    while (stack.length) {
      const species = stack.pop()!;
      speciesList!.push(species);
      species.children.forEach((child) => {
        child.level = species.level + 1;
        stack.push(child);
      });
    }
  }

  return { speciesMap, speciesList };
}
