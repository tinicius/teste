import Modal from "@mui/material/Modal";
import { Pokemon } from "../../entities";
import { useFetchPokemonDetails } from "../../lib/useFetchPokemonDetails";
import { PokemonImages } from "../PokemonImages";
import { Skeleton } from "@mui/material";
import { PokemonTypeCard } from "../PokemonTypeCard";

export const PokemonModal = ({
  onClose,
  pokemon,
}: {
  pokemon: Pokemon;
  onClose: () => void;
}) => {
  return (
    <Modal open onClose={onClose}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 md:w-1/2 lg:w-1/3 bg-white rounded-lg shadow-lg outline-none">
        <Content pokemon={pokemon} />
      </div>
    </Modal>
  );
};

const Content = ({ pokemon }: { pokemon: Pokemon }) => {
  const { pokemonDetails, isLoading } = useFetchPokemonDetails({
    url: pokemon.url,
  });

  if (isLoading)
    return (
      <div className="flex flex-col gap-2 p-4">
        <div className="flex flex-row items-center justify-center">
          <div className="w-32 h-32">
            <Skeleton variant="rounded" height="100%" width="100%" />
          </div>
        </div>

        <div className="flex flex-col">
          <Skeleton variant="text" width={100} height={40} />
          <Skeleton variant="text" width={50} />
        </div>

        <div className="flex flex-row gap-2">
          <Skeleton variant="rounded" height={20} width={100} />
          <Skeleton variant="rounded" height={20} width={100} />
        </div>

        <div className="flex flex-row gap-4">
          <div className="flex-1 flex-col">
            <Skeleton variant="text" width={50} />
            <Skeleton variant="rounded" height={34} />
          </div>

          <div className="flex-1 flex-col">
            <Skeleton variant="text" width={50} />
            <Skeleton variant="rounded" height={34} />
          </div>
        </div>
      </div>
    );

  if (!pokemonDetails) return <div>Error loading Pokémon details</div>;

  return (
    <div className="flex flex-col gap-2">
      {pokemonDetails.images.length > 0 && (
        <PokemonImages
          images={pokemonDetails.images}
          name={pokemonDetails.name}
          type={pokemonDetails.types[0]}
        />
      )}

      <div className="flex flex-col p-4">
        <div className="flex flex-col">
          <p className="text-4xl">{pokemonDetails.name}</p>
          <p className="text-sm">{`Nº ${pokemonDetails.id}`}</p>
        </div>

        <div className="flex flex-row gap-2">
          {pokemonDetails.types.map((type) => (
            <PokemonTypeCard key={type} type={type} />
          ))}
        </div>

        <div className="flex flex-row gap-4">
          <div className="flex-1 flex-col">
            <p>Peso</p>
            <div className="border-1 border-gray-400 rounded-sm p-1">
              <p className="font-semibold">{`${
                pokemonDetails.weight / 10
              } kg`}</p>
            </div>
          </div>

          <div className="flex-1 flex-col">
            <p>Altura</p>
            <div className="border-1 border-gray-400 rounded-sm p-1">
              <p className="font-semibold">{`${
                pokemonDetails.height / 10
              } m`}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex-col">
          <p>Espécie</p>
          <div className="border-1 border-gray-400 rounded-sm p-1">
            <p className="font-semibold">{`${pokemonDetails.species.name}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
