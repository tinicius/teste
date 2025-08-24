import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Pokemon } from "../entities";
import { CardMedia, Typography } from "@mui/material";

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
            image={pokemon.url}
            alt={pokemon.name}
          />
        </Box>

        <Typography fontSize={32}>{pokemon.name}</Typography>
        <Typography fontSize={16}>{`Nº ${pokemon.id}`}</Typography>
      </Box>
    </Modal>
  );
};
