import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Pokemon } from "../entities";
import { CardMedia, Typography } from "@mui/material";
import { PokemonType } from "./PokemonType";
import { useFetchPokemonDetails } from "../lib/useFetchPokemonDetails";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export const PokemonModal = ({
  onClose,
  pokemon,
}: {
  pokemon: Pokemon;
  onClose: () => void;
}) => {
  const { pokemonDetails, isLoading } = useFetchPokemonDetails({
    url: pokemon.url,
  });

  if (isLoading) return <div>Loading...</div>;

  if (!pokemonDetails) return <div>Error loading Pokémon details</div>;

  return (
    <Modal
      open
      onClose={onClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style }}>
        <Box>
          <CardMedia
            component="img"
            height={300}
            width={300}
            sx={{
              objectFit: "contain",
            }}
            image={pokemonDetails.sprites.front_default}
            alt={pokemonDetails.name}
          />
        </Box>

        <Typography fontSize={32}>{pokemonDetails.name}</Typography>
        <Typography fontSize={16}>{`Nº ${pokemonDetails.id}`}</Typography>

        <Box sx={{ display: "flex", flexDirection: "row", gap: "6px" }}>
          {pokemonDetails.types.map(({ type }) => (
            <PokemonType key={type.name} type={type.name} />
          ))}
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row", gap: "6px" }}>
          <Typography fontWeight={600}>Peso:</Typography>
          <Typography fontWeight={600}>{`${
            pokemonDetails.weight / 10
          } kg`}</Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row", gap: "6px" }}>
          <Typography fontWeight={600}>Altura:</Typography>
          <Typography fontWeight={600}>{`${
            pokemonDetails.height / 10
          } m`}</Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row", gap: "6px" }}>
          <Typography fontWeight={600}>Espécie:</Typography>
          <Typography
            fontWeight={600}
          >{`${pokemonDetails.species.name}`}</Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row", gap: "6px" }}>
          <Typography fontWeight={600}>Habilidades:</Typography>
          <Typography fontWeight={600}>{`${pokemonDetails.abilities
            .map((ability) => ability.ability.name)
            .join(", ")}`}</Typography>
        </Box>

        <PokemonGender />

        <PokemonForms />
      </Box>
    </Modal>
  );
};

const PokemonGender = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: "6px" }}>
      <Typography fontWeight={600}>Gender:</Typography>
      <Typography fontWeight={600}>{`12`}</Typography>
    </Box>
  );
};

const PokemonForms = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: "6px" }}>
      <Typography fontWeight={600}>Forms:</Typography>
      <Typography fontWeight={600}>{`12`}</Typography>
    </Box>
  );
};
