import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { Product, SKU } from "../types";

export default function ProductCard({ product }: { product: Product }) {
  const sku: SKU | undefined = product.items[0];
  const image = sku?.images[0];
  const price = sku?.sellers[0].commertialOffer.Price;
  const { add } = useCart();

  if (!sku || !image) return null;

  return (
    <article>
      <Link to={`/product/${product.productId}`}>
        <img
          src={image.imageUrl}
          alt={image.imageText}
          width={220}
          height={220}
        />
      </Link>

      <h3>{product.productName}</h3>
      <p>
        {price?.toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
        })}
      </p>

      <button onClick={() => add(product, sku)}>Añadir al carrito</button>

      <Link to={`/product/${product.productId}`}>Ver detalle</Link>
    </article>
  );
}
