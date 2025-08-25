"use client";

import { TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { PokemonModal } from "./components/PokemonModal";
import { Pokemon } from "./entities";
import CustomPaginationActionsTable from "./components/PokemonTable";

export default function Home() {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const [search, setSearch] = useState("");
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

      setSearch(searchValue);
    },
    [searchValue]
  );

  return (
    <div className="flex-1 h-screen ">
      {selectedPokemon && (
        <PokemonModal pokemon={selectedPokemon} onClose={handleCloseModal} />
      )}

      <div className="flex flex-col p-3 gap-3">
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

        <CustomPaginationActionsTable
          search={search}
          onSelect={handleSelectPokemon}
        />
      </div>
    </div>
  );
}
