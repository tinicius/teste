import { render, screen, fireEvent } from "@testing-library/react";
import { PokemonType } from "../../entities/PokemonType";
import { PokemonImages } from ".";

describe("PokemonImages", () => {
  const images = ["img1.png", "img2.png", "img3.png"];
  const name = "Bulbasaur";
  const type = PokemonType.Grass;

  it("renders the first image by default", () => {
    render(<PokemonImages images={images} name={name} type={type} />);
    const img = screen.getByAltText(name) as HTMLImageElement;
    expect(img).toHaveAttribute("src", "img1.png");
  });

  it("goes to next image when '>' is clicked", () => {
    render(<PokemonImages images={images} name={name} type={type} />);
    fireEvent.click(screen.getByText(">"));
    const img = screen.getByAltText(name) as HTMLImageElement;
    expect(img).toHaveAttribute("src", "img2.png");
  });

  it("loops back to first image after last", () => {
    render(<PokemonImages images={images} name={name} type={type} />);
    // click next 3 times
    fireEvent.click(screen.getByText(">"));
    fireEvent.click(screen.getByText(">"));
    fireEvent.click(screen.getByText(">"));
    const img = screen.getByAltText(name) as HTMLImageElement;
    expect(img).toHaveAttribute("src", "img1.png");
  });

  it("goes to previous image when '<' is clicked", () => {
    render(<PokemonImages images={images} name={name} type={type} />);
    fireEvent.click(screen.getByText("<"));
    const img = screen.getByAltText(name) as HTMLImageElement;
    expect(img).toHaveAttribute("src", "img3.png"); // wrap around
  });
});
