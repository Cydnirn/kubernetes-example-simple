const runtimeConfig = window.__CONFIG__ || {};
const rawApiUrl = runtimeConfig.API_URL || "http://localhost:3000";
const API_URL = rawApiUrl.replace(/\/$/, "");

export async function apiFetch(path, options = {}) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${API_URL}${normalizedPath}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const payload = response.status === 204 ? null : await (isJson ? response.json() : response.text());

  if (!response.ok) {
    const message =
      (payload && payload.error) ||
      (payload && payload.message) ||
      (typeof payload === "string" && payload) ||
      `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return payload;
}
