import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import { useFetchPokemonSpecies } from "../lib/useFetchPokemonSpecies";
import { styled } from "@mui/material/styles";

export const PokemonGender = ({ speciesUrl }: { speciesUrl: string }) => {
  const { pokemonSpecies, isLoading } = useFetchPokemonSpecies({
    url: speciesUrl,
  });

  if (isLoading) return <LinearProgress />;

  if (!pokemonSpecies) return <div>Error loading Pokémon species</div>;

  const femaleRate = (pokemonSpecies.genderRate / 8) * 100;
  const maleRate = 100 - femaleRate;

  return (
    <div className="flex flex-col">
      <p>Gênero</p>
      <BorderLinearProgress
        variant="determinate"
        value={(pokemonSpecies.genderRate / 8) * 100}
      />

      <div className="flex flex-row justify-between text-xs pt-1">
        <p>{`${maleRate} %`}</p>
        <p>{`${femaleRate} %`}</p>
      </div>
    </div>
  );
};

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#FF7596",
    ...theme.applyStyles("dark", {
      backgroundColor: "#FF7596",
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 4,
    backgroundColor: "#2551C3",
    ...theme.applyStyles("dark", {
      backgroundColor: "#2551C3",
    }),
  },
}));
