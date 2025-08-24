import { Pokemon } from "@/app/entities";

export interface PokemonResponse {
  count: number;
  next: string;
  previous: string | null;
  results: Pokemon[];
}
