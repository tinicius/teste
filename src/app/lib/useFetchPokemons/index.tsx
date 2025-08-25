import { Pokemon } from "@/app/entities";
import { PokemonResponse } from "./entities";
import { useCallback, useEffect, useRef, useState } from "react";

const FETCH_LIMIT = 10;
const FETCH_ALL_LIMIT = 10000;

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
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=${nameOffset.current}&limit=${FETCH_ALL_LIMIT}`
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

            if (pokemons.length >= FETCH_LIMIT) {
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
          nameOffset.current = FETCH_ALL_LIMIT;
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

      if (pokemons.length < FETCH_LIMIT) {
        setIsLimitReached(true);
      }

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

        if (pokemons.length < FETCH_LIMIT) {
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
