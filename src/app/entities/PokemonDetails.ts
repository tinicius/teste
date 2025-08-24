export interface PokemonDetails {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  weight: number;
  height: number;
  category: string;
  ability: string;
  types: [
    {
      slot: number;
      type: {
        name: string;
        url: string;
      };
    }
  ];
}
