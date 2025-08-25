import { PokemonType } from "./PokemonType";

export interface PokemonDetails {
  id: number;
  name: string;
  images: string[];
  weight: number;
  height: number;
  types: PokemonType[];
  species: {
    name: string;
    url: string;
  };
}
