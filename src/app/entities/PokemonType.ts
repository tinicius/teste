export enum PokemonType {
  Normal = "normal",
  Fighting = "fighting",
  Flying = "flying",
  Poison = "poison",
  Ground = "ground",
  Rock = "rock",
  Bug = "bug",
  Ghost = "ghost",
  Steel = "steel",
  Fire = "fire",
  Water = "water",
  Grass = "grass",
  Electric = "electric",
  Psychic = "psychic",
  Ice = "ice",
  Dragon = "dragon",
  Dark = "dark",
  Fairy = "fairy",
  Stellar = "stellar",
  Unknown = "unknown",
}

export const getPokemonTypePT = (type: PokemonType): string => {
  switch (type) {
    case PokemonType.Normal:
      return "Normal";
    case PokemonType.Fighting:
      return "Lutador";
    case PokemonType.Flying:
      return "Voador";
    case PokemonType.Poison:
      return "Venenoso";
    case PokemonType.Ground:
      return "Terrestre";
    case PokemonType.Rock:
      return "Pedra";
    case PokemonType.Bug:
      return "Inseto";
    case PokemonType.Ghost:
      return "Fantasma";
    case PokemonType.Steel:
      return "Aço";
    case PokemonType.Fire:
      return "Fogo";
    case PokemonType.Water:
      return "Água";
    case PokemonType.Grass:
      return "Grama";
    case PokemonType.Electric:
      return "Elétrico";
    case PokemonType.Psychic:
      return "Psíquico";
    case PokemonType.Ice:
      return "Gelo";
    case PokemonType.Dragon:
      return "Dragão";
    case PokemonType.Dark:
      return "Sombrio";
    case PokemonType.Fairy:
      return "Fada";
    case PokemonType.Stellar:
      return "Estelar";
    case PokemonType.Unknown:
      return "Desconhecido";
    default:
      return "Desconhecido";
  }
};

export const getPokemonTypeColor = (type: PokemonType): string => {
  switch (type) {
    case PokemonType.Normal:
      return "#A8A77A"; // beige/khaki
    case PokemonType.Fighting:
      return "#C22E28"; // red
    case PokemonType.Flying:
      return "#A98FF3"; // light purple
    case PokemonType.Poison:
      return "#A33EA1"; // purple
    case PokemonType.Ground:
      return "#E2BF65"; // sand
    case PokemonType.Rock:
      return "#B6A136"; // brown
    case PokemonType.Bug:
      return "#A6B91A"; // green
    case PokemonType.Ghost:
      return "#735797"; // dark purple
    case PokemonType.Steel:
      return "#B7B7CE"; // grey
    case PokemonType.Fire:
      return "#EE8130"; // orange
    case PokemonType.Water:
      return "#6390F0"; // blue
    case PokemonType.Grass:
      return "#50d71e"; // green
    case PokemonType.Electric:
      return "#F7D02C"; // yellow
    case PokemonType.Psychic:
      return "#F95587"; // pink
    case PokemonType.Ice:
      return "#96D9D6"; // cyan
    case PokemonType.Dragon:
      return "#6F35FC"; // purple
    case PokemonType.Dark:
      return "#705746"; // dark brown
    case PokemonType.Fairy:
      return "#D685AD"; // light pink
    case PokemonType.Stellar:
      return "#FFD700"; // gold
    case PokemonType.Unknown:
      return "#68A090"; // grey-blue
    default:
      return "#68A090"; // fallback color
  }
};
