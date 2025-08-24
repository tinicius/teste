export interface PokemonDetails {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  weight: number;
  height: number;
  category: string;
  abilities: {
    is_hidden: boolean;
    slot: number;
    ability: {
      id: string;
      name: string;
    };
  }[];
  types: [
    {
      slot: number;
      type: {
        name: string;
        url: string;
      };
    }
  ];
  species: {
    name: string;
    url: string;
  };
  forms: {
    name: string;
    url: string;
  }[];
}
