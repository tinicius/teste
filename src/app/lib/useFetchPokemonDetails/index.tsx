import { PokemonDetails } from "@/app/entities/PokemonDetails";
import { useEffect, useState } from "react";
import { PokemonDetailsResponse } from "./entities";

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
        const data = (await res.json()) as PokemonDetailsResponse;

        const images = [
          data.sprites.front_default,
          data.sprites.front_shiny,
          data.sprites.front_female,
          data.sprites.front_shiny_female,
          data.sprites.back_default,
          data.sprites.back_shiny,
          data.sprites.back_female,
          data.sprites.back_shiny_female,
        ].filter((img): img is string => !!img);

        const types = data.types.map((t) => t.type.name);

        setPokemonDetails({
          id: data.id,
          name: data.name,
          images,
          weight: data.weight,
          height: data.height,
          types,
          species: data.species,
        });
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
