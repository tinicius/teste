import { Pokemon } from "@/app/entities";
import { PokemonResponse } from "./entities";
import { useCallback, useEffect, useRef, useState } from "react";

export const useFetchPokemons = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [isLimitReached, setIsLimitReached] = useState(false);

  const offset = useRef(0);
  const limit = useRef(20);

  const nameOffset = useRef(0);

  const getPokemonsByName = useCallback(
    async (name: string): Promise<Pokemon[]> => {
      try {
        const maxLimit = 10000;

        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=${nameOffset.current}&limit=${maxLimit}`
        );

        const json = (await res.json()) as PokemonResponse;

        const pokemons: Pokemon[] = [];

        let countResult = 0;

        for (let index = 0; index < json.results.length; index++) {
          const pokemon = json.results[index];

          if (name && !pokemon.name.toLowerCase().includes(name.toLowerCase()))
            continue;

          try {
            pokemons.push(pokemon);

            if (pokemons.length >= 10) {
              countResult = index + 1;
              break;
            }
          } catch (error) {
            console.error("Error fetching pokemon details:", error);
          }
        }

        if (countResult !== 0) {
          nameOffset.current += countResult;
        } else {
          nameOffset.current = 10000;
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
        `https://pokeapi.co/api/v2/pokemon?offset=${offset.current}&limit=${limit.current}`
      );

      const json = (await res.json()) as PokemonResponse;

      return json.results;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  }, []);

  const fetchPokemonsByName = useCallback(
    async (name: string): Promise<void> => {
      setIsLoading(true);

      nameOffset.current = 0;
      setIsLimitReached(false);

      const pokemons = await getPokemonsByName(name);
      setIsLoading(false);
      setPokemons(pokemons);
    },
    [getPokemonsByName]
  );

  const loadMore = useCallback(
    async (search: string) => {
      setIsLoadingMore(true);

      if (search.length) {
        const pokemons = await getPokemonsByName(search);

        if (pokemons.length < 10) {
          setIsLimitReached(true);
        }

        if (pokemons.length) setPokemons((prev) => [...prev, ...pokemons]);

        setIsLoadingMore(false);
        return;
      }

      offset.current += limit.current;
      const pokemons = await getPokemons();

      setPokemons((prev) => [...prev, ...pokemons]);
      setIsLoadingMore(false);
    },
    [getPokemons, getPokemonsByName]
  );

  useEffect(() => {
    const loadInitial = async () => {
      const pokemons = await getPokemons();

      setPokemons(pokemons);
      setIsLoading(false);
    };

    loadInitial();
  }, [getPokemons]);

  return {
    loadMore,
    fetchPokemonsByName,
    pokemons,
    isLoading,
    isLoadingMore,
    isLimitReached,
  };
};
