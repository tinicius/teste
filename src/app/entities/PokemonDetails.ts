export interface PokemonDetails {
  id: number;
  name: string;
  images: string[];
  weight: number;
  height: number;
  types: string[];
  species: {
    name: string;
    url: string;
  };
}
