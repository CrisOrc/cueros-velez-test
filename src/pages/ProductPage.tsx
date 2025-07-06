import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Product, SKU } from "../types";
import { getProduct } from "../api";
import {
  CartButton,
  ErrorMessage,
  Gallery,
  Shelf,
  SizeSelector,
} from "../components";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [sku, setSku] = useState<SKU | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getProduct(id)
      .then((data) => {
        const p = data[0];
        setProduct(p);
        setSku(p.items[0]);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Cargando…</p>;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return <p>Producto no encontrado</p>;

  const sizes = product.items.map((i) => i.Talla?.[0] || "");

  return (
    <main>
      <Gallery images={sku?.images ?? []} />

      <h1>{product.productName}</h1>
      <p>Marca: {product.brand}</p>
      <p>Referencia: {product.productReference}</p>
      <p>
        Precio:{" "}
        {sku?.sellers[0].commertialOffer.Price.toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
        })}
      </p>

      <SizeSelector
        sizes={sizes}
        value={sku?.Talla?.[0]}
        onChange={(size) =>
          setSku(product.items.find((i) => i.Talla?.[0] === size) || null)
        }
      />

      <CartButton product={product} sku={sku} disabled={!sku} />

      <Shelf />
    </main>
  );
}
