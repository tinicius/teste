import { PokemonDetails } from "@/app/entities/PokemonDetails";
import { useEffect, useState } from "react";

export const useFetchPokemonDetails = ({ url }: { url: string }) => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(url);
        const data = await res.json();
        setPokemonDetails(data);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [url]);

  return { pokemonDetails, isLoading };
};
