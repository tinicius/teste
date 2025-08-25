import { PokemonSpecies } from "@/app/entities/PokemonSpecies";
import { useEffect, useState } from "react";
import { PokemonSpeciesResponse } from "./entities";

export const useFetchPokemonSpecies = ({ url }: { url: string }) => {
  const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(url);
        const data = (await res.json()) as PokemonSpeciesResponse;
        setPokemonSpecies({
          id: data.id,
          genderRate: data.gender_rate,
          name: data.name,
        });
      } catch (error) {
        console.error("Error fetching Pokémon species:", error);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [url]);

  return { pokemonSpecies, isLoading };
};
