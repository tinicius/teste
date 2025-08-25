import { useCallback, useState } from "react";
import { getPokemonTypeColor, PokemonType } from "../../entities/PokemonType";

export const PokemonImages = ({
  images,
  name,
  type,
}: {
  images: string[];
  name: string;
  type: PokemonType;
}) => {
  const [imageIndex, setImageIndex] = useState(0);

  const handlePreviousImage = useCallback(() => {
    setImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  const handleNextImage = useCallback(() => {
    setImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  return (
    <div
      className={`flex flex-row justify-center items-center gap-4 rounded-lg`}
      style={{
        backgroundColor: getPokemonTypeColor(type),
      }}
    >
      <p onClick={handlePreviousImage}>{"<"}</p>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="w-32 h-32 " src={images[imageIndex]} alt={name} />

      <p onClick={handleNextImage}>{">"}</p>
    </div>
  );
};
