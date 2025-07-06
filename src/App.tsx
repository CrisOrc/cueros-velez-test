import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider, useCart } from "./context/CartContext";
import { ProductListPage, ProductPage } from "./pages";

function CartSummary() {
  const { items, remove, clear } = useCart();
  const total = items.reduce((acc, i) => acc + i.price * i.qty, 0);

  return (
    <aside>
      <h2>Carrito ({items.length})</h2>
      <ul>
        {items.map((i) => (
          <li key={i.skuId}>
            <img src={i.image} width={40} /> {i.name} x{i.qty}{" "}
            <button onClick={() => remove(i.skuId)}>X</button>
          </li>
        ))}
      </ul>
      <p>
        Total:{" "}
        {total.toLocaleString("es-CO", { style: "currency", currency: "COP" })}
      </p>
      <button>Finalizar compra</button>
      <button onClick={clear}>Vaciar</button>
    </aside>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <CartSummary />
        <Routes>
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="*" element={<ProductListPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
