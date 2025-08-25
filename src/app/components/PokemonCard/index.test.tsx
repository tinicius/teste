import { render, screen, fireEvent } from "@testing-library/react";
import { Pokemon } from "../../entities";
import { PokemonCard } from ".";

describe("PokemonCard", () => {
  const mockPokemon: Pokemon = {
    name: "Pikachu",
    url: "https://pokeapi.co/api/v2/pokemon/25/",
  };

  it("renders the pokemon name", () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={() => {}} />);
    expect(screen.getByText("Pikachu")).toBeInTheDocument();
  });

  it("calls onClick when card is clicked", () => {
    const handleClick = jest.fn();
    render(<PokemonCard pokemon={mockPokemon} onClick={handleClick} />);

    fireEvent.click(screen.getByText("Pikachu"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
