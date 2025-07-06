import { useEffect, useState } from "react";
import { searchProducts } from "../api/products";
import { Link } from "react-router-dom";
import type { Product } from "../types";

export default function Shelf() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    searchProducts().then(setProducts).catch(console.error);
  }, []);
  return (
    <section>
      <h2>Productos recomendados</h2>
      <ul>
        {products.map((p) => (
          <li key={p.productId}>
            <Link to={`/product/${p.productId}`}>{p.productName}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
