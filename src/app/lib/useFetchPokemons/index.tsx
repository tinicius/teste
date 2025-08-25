import { Pokemon } from "@/app/entities";
import { PokemonResponse } from "./entities";
import { useCallback, useEffect, useRef, useState } from "react";

const FETCH_ALL_LIMIT = 10000;

export const useFetchPokemons = ({
  offset,
  limit,
  search,
}: {
  offset: number;
  limit: number;
  search: string;
}) => {
  const [count, setCount] = useState(0);

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const nameOffset = useRef(0);

  const getPokemonsByName = useCallback(
    async (name: string): Promise<Pokemon[]> => {
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=${nameOffset.current}&limit=${FETCH_ALL_LIMIT}`
        );

        const json = (await res.json()) as PokemonResponse;

        const pokemons: Pokemon[] = [];

        for (let index = 0; index < json.results.length; index++) {
          const pokemon = json.results[index];

          if (name && !pokemon.name.toLowerCase().includes(name.toLowerCase()))
            continue;

          try {
            pokemons.push(pokemon);
          } catch (error) {
            console.error("Error fetching pokemon details:", error);
          }
        }

        return pokemons;
      } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
      }
    },
    []
  );

  const getPokemons = useCallback(async (): Promise<Pokemon[]> => {
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
      );

      const json = (await res.json()) as PokemonResponse;

      setCount(json.count);

      return json.results;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  }, [limit, offset]);

  useEffect(() => {
    const loadInitial = async () => {
      setIsLoading(true);

      if (search.length > 0) {
        const pokemons = await getPokemonsByName(search);

        setCount(pokemons.length);

        setPokemons(pokemons.slice(offset, offset + limit));
        setIsLoading(false);

        return;
      }

      const pokemons = await getPokemons();

      setPokemons(pokemons);
      setIsLoading(false);
    };

    loadInitial();
  }, [getPokemons, getPokemonsByName, limit, offset, search]);

  return {
    isLoading,
    pokemons,
    count,
  };
};
