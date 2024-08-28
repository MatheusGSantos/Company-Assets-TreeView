import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Placeholder from "@assets/images/placeholder-image.png";

interface ImageProps {
  src: string;
  alt: string;
}

export function Image({ src, alt }: Readonly<ImageProps>) {
  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      effect="blur"
      placeholderSrc={Placeholder}
      threshold={100}
    />
  );
}
