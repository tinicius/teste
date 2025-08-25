import { render, screen } from "@testing-library/react";
import { PokemonTypeCard } from ".";
import { getPokemonTypeColor, PokemonType } from "../../entities/PokemonType";

describe("PokemonTypeCard", () => {
  it("renders the translated name", () => {
    render(<PokemonTypeCard type={PokemonType.Grass} />);

    expect(screen.getByText("Grama")).toBeInTheDocument();
  });

  it("applies the background color", () => {
    render(<PokemonTypeCard type={PokemonType.Grass} />);

    const card = screen.getByText(/./).closest("div");
    expect(card).toHaveStyle(
      `background-color: ${getPokemonTypeColor(PokemonType.Grass)}`
    );
  });
});
