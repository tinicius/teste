import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { Pokemon } from "../entities";
import Typography from "@mui/material/Typography";

export const PokemonCard = ({
  pokemon,
  onClick,
}: {
  pokemon: Pokemon;
  onClick: () => void;
}) => {
  return (
    <Card onClick={onClick}>
      <Box sx={{ display: "flex", flexDirection: "row", height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "12px",
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography fontSize={21}>{pokemon.name}</Typography>
        </Box>
      </Box>
    </Card>
  );
};
