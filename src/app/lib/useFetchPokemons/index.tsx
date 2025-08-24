import { Pokemon } from "@/app/entities";
import { PokemonDetailsResponse, PokemonResponse } from "./entities";
import { useCallback, useEffect, useRef, useState } from "react";

export const useFetchPokemons = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const offset = useRef(0);
  const limit = useRef(20);

  const nameOffset = useRef(0);

  const getPokemonsByName = useCallback(
    async (name: string): Promise<Pokemon[]> => {
      try {
        const maxLimit = 10000;

        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species?offset=${nameOffset.current}&limit=${maxLimit}`
        );

        const json = (await res.json()) as PokemonResponse;

        const pokemons: Pokemon[] = [];

        for (let index = 0; index < json.results.length; index++) {
          const pokemon = json.results[index];

          if (name && !pokemon.name.toLowerCase().includes(name.toLowerCase()))
            continue;

          const details = (await (
            await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
          ).json()) as PokemonDetailsResponse;

          pokemons.push({
            id: details.id,
            name: pokemon.name,
            url: details.sprites.front_default,
            types: details.types.map((type) => type.type.name),
          });

          console.log(pokemons.length);

          if (pokemons.length >= 10) {
            nameOffset.current += index + 1;
            break;
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
        `https://pokeapi.co/api/v2/pokemon?offset=${offset.current}&limit=${limit.current}`
      );

      const json = (await res.json()) as PokemonResponse;

      const pokemons: Pokemon[] = [];

      for (let index = 0; index < json.results.length; index++) {
        const pokemon = json.results[index];

        const details = (await (
          await fetch(pokemon.url)
        ).json()) as PokemonDetailsResponse;

        pokemons.push({
          id: details.id,
          name: pokemon.name,
          url: details.sprites.front_default,
          types: details.types.map((type) => type.type.name),
        });
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
      const pokemons = await getPokemonsByName(name);
      setIsLoading(false);
      setPokemons(pokemons);
    },
    [getPokemonsByName]
  );

  const loadMore = useCallback(
    async (search: string) => {
      if (search.length) {
        const pokemons = await getPokemonsByName(search);
        setPokemons((prev) => [...prev, ...pokemons]);
        return;
      }

      offset.current += limit.current;
      const pokemons = await getPokemons();

      setPokemons((prev) => [...prev, ...pokemons]);
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

  return { loadMore, fetchPokemonsByName, pokemons, isLoading };
};
