import { render, screen } from "@testing-library/react";
import { PokemonModal } from ".";
import { Pokemon } from "../../entities";

// mock the custom hook
jest.mock("../../lib/useFetchPokemonDetails", () => ({
  useFetchPokemonDetails: jest.fn(),
}));

import { useFetchPokemonDetails } from "../../lib/useFetchPokemonDetails";
const mockedUseFetchPokemonDetails = useFetchPokemonDetails as jest.Mock;

describe("PokemonModal", () => {
  const basePokemon: Pokemon = {
    id: 1,
    name: "Bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/",
  } as Pokemon;

  it("renders error state", () => {
    mockedUseFetchPokemonDetails.mockReturnValue({
      pokemonDetails: null,
      isLoading: false,
    });

    render(<PokemonModal pokemon={basePokemon} onClose={jest.fn()} />);
    expect(
      screen.getByText(/Error loading Pokémon details/i)
    ).toBeInTheDocument();
  });

  it("renders pokemon details", () => {
    mockedUseFetchPokemonDetails.mockReturnValue({
      isLoading: false,
      pokemonDetails: {
        id: 1,
        name: "Bulbasaur",
        images: ["img1.png"],
        types: ["grass", "poison"],
        weight: 69,
        height: 7,
        species: { name: "Seed Pokémon" },
      },
    });

    render(<PokemonModal pokemon={basePokemon} onClose={jest.fn()} />);

    // Check image
    expect(screen.getByAltText("Bulbasaur")).toHaveAttribute("src", "img1.png");

    // Check basic info
    expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("Nº 1")).toBeInTheDocument();
    expect(screen.getByText("6.9 kg")).toBeInTheDocument();
    expect(screen.getByText("0.7 m")).toBeInTheDocument();
    expect(screen.getByText("Seed Pokémon")).toBeInTheDocument();
  });
});
