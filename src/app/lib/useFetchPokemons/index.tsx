import { Pokemon } from "@/app/entities";
import { PokemonDetailsResponse, PokemonResponse } from "./entities";
import { useCallback, useEffect, useRef, useState } from "react";

export const useFetchPokemons = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const offset = useRef(0);
  const limit = useRef(20);

  const nameOffset = useRef(0);

  const getPokemonsByName = useCallback(
    async (name: string): Promise<Pokemon[]> => {
      try {
        console.log(nameOffset.current);
        const maxLimit = 10000;

        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species?offset=${nameOffset.current}&limit=${maxLimit}`
        );

        const json = (await res.json()) as PokemonResponse;

        const pokemons: Pokemon[] = [];

        let countResult = 0;

        for (let index = 0; index < json.results.length; index++) {
          const pokemon = json.results[index];

          if (name && !pokemon.name.toLowerCase().includes(name.toLowerCase()))
            continue;

          try {
            const details = (await (
              await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
            ).json()) as PokemonDetailsResponse;

            pokemons.push({
              id: details.id,
              name: pokemon.name,
              url: details.sprites.front_default,
              types: details.types.map((type) => type.type.name),
            });

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
        `https://pokeapi.co/api/v2/pokemon-species?offset=${offset.current}&limit=${limit.current}`
      );

      const json = (await res.json()) as PokemonResponse;

      const pokemons: Pokemon[] = [];

      for (let index = 0; index < json.results.length; index++) {
        const pokemon = json.results[index];

        try {
          const details = (await (
            await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
          ).json()) as PokemonDetailsResponse;

          pokemons.push({
            id: details.id,
            name: pokemon.name,
            url: details.sprites.front_default,
            types: details.types.map((type) => type.type.name),
          });
        } catch (error) {
          console.error("Error fetching pokemon details:", error);
        }
      }

      return pokemons;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  }, []);

  const fetchPokemonsByName = useCallback(
    async (name: string): Promise<void> => {
      setIsLoading(true);
      nameOffset.current = 0;
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
        setPokemons((prev) => [...prev, ...pokemons]);
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
      setIsLoading(true);
      const pokemons = await getPokemons();
      setPokemons(pokemons);
      setIsLoading(false);
    };

    loadInitial();
  }, [getPokemons]);

  return { loadMore, fetchPokemonsByName, pokemons, isLoading, isLoadingMore };
};
