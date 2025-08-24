export interface PokemonDetailsResponse {
  id: number;
  sprites: {
    front_default: string;
  };
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
