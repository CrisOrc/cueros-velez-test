import { fetchJson } from ".";
import type { Product } from "../types";

const BASE = "https://api-frontend-production.up.railway.app/api";

export async function getProduct(id: string) {
  return fetchJson<Product[]>(`${BASE}/products/${id}`);
}

export async function searchProducts(q = "tenis", limit = 8) {
  const data = await fetchJson<Product[]>(`${BASE}/products?ft=${q}`);
  return data.slice(0, limit);
}
