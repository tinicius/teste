export interface PokemonDetailsResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    front_shiny: string;
    front_female: string;
    front_shiny_female: string;
    back_default: string;
    back_shiny: string;
    back_female: string;
    back_shiny_female: string;
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
