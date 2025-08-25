import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import { useFetchPokemonSpecies } from "../lib/useFetchPokemonSpecies";
import { styled } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";

export const PokemonGender = ({ speciesUrl }: { speciesUrl: string }) => {
  const { pokemonSpecies, isLoading } = useFetchPokemonSpecies({
    url: speciesUrl,
  });

  if (isLoading)
    return (
      <div className="flex flex-col justify-center  text-center">
        <div className="flex flex-row justify-center items-center">
          <Skeleton variant="text" width={50} />
        </div>

        <Skeleton variant="rounded" height={8} />

        <div className="flex flex-row justify-between text-xs pt-1">
          <Skeleton variant="text" width={50} />
          <Skeleton variant="text" width={50} />
        </div>
      </div>
    );

  if (!pokemonSpecies) return <div>Error loading Pokémon species</div>;

  if (pokemonSpecies.genderRate === -1) {
    return (
      <div className="flex flex-col">
        <p>Gênero</p>
        <BorderLinearProgressDisabled />

        <div className="flex flex-row justify-between text-xs pt-1">
          <p>?? %</p>
          <p>?? %</p>
        </div>
      </div>
    );
  }

  const femaleRate = (pokemonSpecies.genderRate / 8) * 100;
  const maleRate = 100 - femaleRate;

  return (
    <div className="flex flex-col justify-center text-center">
      <p>Gênero</p>
      <BorderLinearProgress variant="determinate" value={maleRate} />

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

const BorderLinearProgressDisabled = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "gray",
    ...theme.applyStyles("dark", {
      backgroundColor: "gray",
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 4,
    backgroundColor: "gray",
    ...theme.applyStyles("dark", {
      backgroundColor: "gray",
    }),
  },
}));
