import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { Pokemon } from "../entities";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";

export const PokemonCard = ({
  pokemon,
  onClick,
}: {
  pokemon: Pokemon;
  onClick: () => void;
}) => {
  return (
    <Card sx={{ height: 100 }} onClick={onClick}>
      <Box sx={{ display: "flex", flexDirection: "row", height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "12px",
            flexGrow: 1,
          }}
        >
          <Typography fontWeight={10} fontSize={12}>
            {`Nº ${pokemon.id}`}
          </Typography>
          <Typography fontSize={21}>{pokemon.name}</Typography>

          <Box sx={{ display: "flex", flexDirection: "row", gap: "6px" }}>
            {pokemon.types.map((type) => (
              <Typography key={type} fontSize={12}>
                {type}
              </Typography>
            ))}
          </Box>
        </Box>

        <CardMedia
          component="img"
          src={pokemon.url}
          alt={pokemon.name}
          sx={{ objectFit: "contain", width: 100, height: 100 }}
        />
      </Box>
    </Card>
  );
};
