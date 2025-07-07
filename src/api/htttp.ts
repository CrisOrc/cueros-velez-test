export async function fetchJson<T>(url: string): Promise<T> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    if (err instanceof Error) throw err;
    throw new Error(String(err));
  }
}
