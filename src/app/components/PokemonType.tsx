import Typography from "@mui/material/Typography";

export const PokemonType = ({ type }: { type: string }) => {
  return (
    <Typography key={type} fontSize={12}>
      {type}
    </Typography>
  );
};
