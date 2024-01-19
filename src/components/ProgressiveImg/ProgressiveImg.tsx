import { useEffect, useState } from "react";
import Loader from "../Loader/Loader.tsx"; // Import the Loader component

const ProgressiveImg = ({
  onClick,
  src,
  className,
  alt,
}: {
  onClick?: () => void;
  src: string;
  alt: string;
  className?: string;
}) => {
  const [imgSrc, setImgSrc] = useState<{ src: string | null; loaded: boolean }>(
    {
      src: null, // Set to null initially
      loaded: false,
    }
  );

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc({ src: src, loaded: true });
    };
  }, [src]);

  return (
    <>
      {/* Render the Loader component when the image is not loaded */}
      {!imgSrc.loaded && <Loader className="img-loader"/>}

      {/* Render the ImgWrapper with the appropriate image source and other props */}
      {imgSrc.loaded && imgSrc.src && (
        <img
          src={imgSrc.src}
          onClick={onClick}
          alt={alt}
          className={className}
        />
      )}
    </>
  );
};

export default ProgressiveImg;
