import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Product, SKU } from "../types";
import { getProduct } from "../api";
import { CartButton, SizeSelector } from "../components";
import "./productPage.css";

export default function ProductDashboard() {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [sku, setSku] = useState<SKU | null>(null);
  const [imgIdx, setImgIdx] = useState(0);
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
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!product || !sku) return <p>Producto no encontrado</p>;

  const money = (n: number) =>
    n.toLocaleString("es-CO", { style: "currency", currency: "COP" });
  const images = sku.images ?? [];
  const active = images[imgIdx]?.imageUrl ?? "";
  const sizes = product.items.map((i) => i.Talla?.[0] ?? "");
  const price = sku.sellers[0].commertialOffer.Price;

  return (
    <main className="pdash">
      <header className="pdash-name">
        <h2>{product.productName}</h2>
        <span className="pdash-price">{money(price)}</span>
      </header>

      <section className="pdash-meta">
        <p>
          <strong>Marca:</strong> {product.brand}
        </p>
        <p>
          <strong>Ref.:</strong> {product.productReference}
        </p>
        <section className="pdash-desc">
          Excelente calidad, materiales premium y confort para uso diario. Ideal
          para quienes buscan estilo y durabilidad.
        </section>
      </section>

      <figure className="pdash-photo">
        <img src={active} alt={product.productName} />
      </figure>

      <section className="pdash-sizes">
        <h3>Tallas</h3>
        <SizeSelector
          sizes={sizes}
          value={sku.Talla?.[0]}
          onChange={(size) =>
            setSku(product.items.find((i) => i.Talla?.[0] === size) ?? sku)
          }
        />
      </section>

      <nav className="pdash-gallery">
        {images.map((img, i) => (
          <button
            key={i}
            className={i === imgIdx ? "g-active" : ""}
            onClick={() => setImgIdx(i)}
          >
            <img src={img.imageUrl} alt={img.imageText} />
          </button>
        ))}
      </nav>

      <footer className="pdash-cta">
        <CartButton product={product} sku={sku} disabled={!sku} />
      </footer>
    </main>
  );
}
