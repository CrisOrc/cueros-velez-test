/**
 * Hace una petición GET y devuelve JSON tipado.
 * Captura automáticamente errores de red y de estado HTTP.
 */
export async function fetchJson<T>(url: string): Promise<T> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      // Mensaje “amigable” más el código HTTP
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    // Normalizamos el error a Error para no perder el stack
    if (err instanceof Error) throw err;
    throw new Error(String(err));
  }
}
