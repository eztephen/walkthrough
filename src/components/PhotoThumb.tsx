import Image from "next/image";
import type { Photo } from "@/lib/types";

interface PhotoThumbProps {
  photo: Photo;
  alt: string;
  size?: "md" | "sm";
  onRemove?: () => void;
}

export default function PhotoThumb({ photo, alt, size = "md", onRemove }: PhotoThumbProps) {
  const box = size === "md" ? "size-22" : "size-[4.6rem]";
  return (
    <div className={`relative shrink-0 overflow-hidden rounded-[5px] border border-line bg-surface-2 ${box}`}>
      {photo.kind === "sample" ? (
        <div className={`size-full swatch-${photo.tone}`} role="img" aria-label={alt} />
      ) : (
        // Blob URLs from the camera never go through the image optimiser.
        <Image src={photo.url} alt={alt} fill unoptimized sizes="88px" className="object-cover" />
      )}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove photo"
          className="absolute top-1 right-1 grid size-5 place-items-center rounded-full bg-[rgb(10_20_20/0.72)] text-[0.72rem] leading-none text-white"
        >
          ×
        </button>
      )}
    </div>
  );
}
