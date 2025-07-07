import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ProductListPage, ProductPage } from "./pages";
import { CartPanel } from "./components";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <CartPanel />
        <Routes>
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="*" element={<ProductListPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
