import { PokemonType } from "../entities";
import { getPokemonTypeColor, getPokemonTypePT } from "../entities/PokemonType";
import Card from "@mui/material/Card";

export const PokemonTypeCard = ({ type }: { type: PokemonType }) => {
  return (
    <Card key={type} sx={{ backgroundColor: getPokemonTypeColor(type) }}>
      <p className="text-sm font-semibold p-1">{getPokemonTypePT(type)}</p>
    </Card>
  );
};
