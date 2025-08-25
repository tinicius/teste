"use client";

import { Button, Skeleton, TextField } from "@mui/material";
import { useFetchPokemons } from "./lib/useFetchPokemons";
import { PokemonCard } from "./components/PokemonCard";
import { useCallback, useState } from "react";
import { PokemonModal } from "./components/PokemonModal";
import { Pokemon } from "./entities";

export default function Home() {
  const {
    loadMore,
    fetchPokemonsByName,
    pokemons,
    isLoading,
    isLoadingMore,
    isLimitReached,
  } = useFetchPokemons();

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const [searchValue, setSearchValue] = useState("");

  const isLoadMoreDisabled =
    isLoadingMore || isLoading || isLimitReached || pokemons.length === 0;

  const handleSelectPokemon = useCallback((pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedPokemon(null);
  }, []);

  const handleSubmitSearch = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      fetchPokemonsByName(searchValue);
    },
    [fetchPokemonsByName, searchValue]
  );

  return (
    <div className="flex-1 min-h-screen ">
      {selectedPokemon && (
        <PokemonModal pokemon={selectedPokemon} onClose={handleCloseModal} />
      )}

      <div className="p-3">
        <form onSubmit={handleSubmitSearch}>
          <TextField
            label="Buscar Pokémon"
            placeholder="Digite o nome..."
            variant="outlined"
            size="small"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            fullWidth
          />
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-3">
        {isLoading ? (
          <>
            {Array.from({ length: 20 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rounded"
                width="100%"
                height={55.5}
              />
            ))}
          </>
        ) : (
          <>
            {pokemons.length > 0 &&
              pokemons.map((pokemon) => (
                <PokemonCard
                  key={pokemon.name}
                  pokemon={pokemon}
                  onClick={() => handleSelectPokemon(pokemon)}
                />
              ))}

            {pokemons.length === 0 && (
              <div className="col-span-full text-center text-black">
                <p>Nenhum Pokémon encontrado.</p>
              </div>
            )}
          </>
        )}
      </div>

      <div className="flex justify-center mb-3">
        <Button
          variant="outlined"
          disabled={isLoadMoreDisabled}
          onClick={() => loadMore(searchValue)}
        >
          {isLoadingMore ? "Loading..." : "Load More"}
        </Button>
      </div>
    </div>
  );
}
