import type { ImgHTMLAttributes } from "react";
import variants from "@/data/image-variants.json";

type Props = ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string };

/** Same image and CSS geometry; browsers choose the appropriate AVIF resolution. */
export function ResponsiveImage({ src, sizes = "100vw", ...props }: Props) {
  const image = variants[src as keyof typeof variants];
  if (!image) return <img src={src} sizes={sizes} {...props} />;
  return (
    <picture className="contents">
      <source type="image/avif" srcSet={image.avif} sizes={sizes} />
      <img src={src} width={image.width} height={image.height} sizes={sizes} {...props} />
    </picture>
  );
}
