import { useEffect, useState } from "react";
import ImgWrapper from "./progressiveImg";
import LoaderImg from "../../assets/load-icon.png";

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
  const [imgSrc, setImgSrc] = useState({
    src: LoaderImg,
    loaded: false,
  });
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc({ src: src, loaded: true });
    };
  }, [src]);
  return (
    <ImgWrapper
      src={imgSrc.src}
      onClick={onClick}
      alt={alt}
      className={className}
      $loaded={imgSrc.loaded}
    />
  );
};

export default ProgressiveImg;
