import { useEffect, useState } from "react";
import type { Product } from "../types";
import { searchProducts } from "../api";
import { ErrorMessage, ProductCard } from "../components";

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    searchProducts("", 24)
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando…</p>;
  if (error) return <ErrorMessage message={error} />;
  if (!products.length) return <p>No se encontraron productos</p>;

  return (
    <main>
      <h2>Catálogo</h2>
      <section>
        {products.map((p) => (
          <ProductCard key={p.productId} product={p} />
        ))}
      </section>
    </main>
  );
}
