import { useCart } from "../context/CartContext";
import type { Product, SKU } from "../types";

export default function CartButton({
  product,
  sku,
  disabled,
}: {
  product: Product;
  sku: SKU | null;
  disabled: boolean;
}) {
  const { add } = useCart();
  return (
    <button onClick={() => sku && add(product, sku)} disabled={disabled}>
      Agregar al carrito
    </button>
  );
}
