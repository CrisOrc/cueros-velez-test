import { useState } from "react";
import type { Image } from "../types";

export default function Gallery({ images }: { images: Image[] }) {
  const [index, setIndex] = useState(0);
  return (
    <div>
      <img
        src={images[index].imageUrl}
        alt={images[index].imageText}
        width={400}
      />
      <div>
        {images.map((img, i) => (
          <button key={i} onClick={() => setIndex(i)}>
            <img src={img.imageUrl} alt={img.imageText} width={60} />
          </button>
        ))}
      </div>
    </div>
  );
}
