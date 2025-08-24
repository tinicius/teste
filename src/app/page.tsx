"use client";

import { Box, Button, Skeleton, TextField } from "@mui/material";

import Grid from "@mui/material/Grid";

import { useFetchPokemons } from "./lib/useFetchPokemons";
import { PokemonCard } from "./components/PokemonCard";
import { useCallback, useState } from "react";
import { PokemonModal } from "./components/PokemonModal";
import { Pokemon } from "./entities";

export default function Home() {
  const { loadMore, fetchPokemonsByName, pokemons, isLoading, isLoadingMore } =
    useFetchPokemons();

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const [searchValue, setSearchValue] = useState("");

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
    <Box
      flexGrow={1}
      bgcolor={"white"}
      padding={2}
      gap={2}
      display="flex"
      flexDirection="column"
    >
      {selectedPokemon && (
        <PokemonModal pokemon={selectedPokemon} onClose={handleCloseModal} />
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "end",
        }}
      >
        <form
          style={{
            width: "100%",
          }}
          onSubmit={handleSubmitSearch}
        >
          <TextField
            label="Search Pokémon"
            placeholder="Type a name..."
            variant="outlined"
            size="small"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            fullWidth
          />
        </form>
      </Box>

      {isLoading ? (
        <Grid
          container
          spacing={2}
          columns={{
            xs: 4,
            sm: 8,
            md: 16,
          }}
        >
          {pokemons.map((pokemon) => (
            <Grid
              key={pokemon.id}
              size={{
                xs: 4,
                sm: 4,
                md: 4,
              }}
            >
              <Skeleton variant="rectangular" width="100%" height={100} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <>
          <PokemonGrid pokemons={pokemons} onClick={handleSelectPokemon} />

          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button
              variant="outlined"
              disabled={isLoadingMore}
              onClick={() => loadMore(searchValue)}
            >
              {isLoadingMore ? "Loading..." : "Load More"}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

const PokemonGrid = ({
  pokemons,
  onClick,
}: {
  pokemons: Pokemon[];
  onClick: (pokemon: Pokemon) => void;
}) => {
  return (
    <>
      <Grid
        container
        spacing={2}
        columns={{
          xs: 4,
          sm: 8,
          md: 16,
        }}
      >
        {pokemons.map((pokemon) => (
          <Grid
            key={pokemon.id}
            size={{
              xs: 4,
              sm: 4,
              md: 4,
            }}
          >
            <PokemonCard pokemon={pokemon} onClick={() => onClick(pokemon)} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
