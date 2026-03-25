export const API_KEY = process.env.REACT_APP_NYT_API_KEY;
export const BASE_URL = "https://api.nytimes.com/svc/books/v3";
export const LIST_NAME = "young-adult-hardcover";

export const ENDPOINTS = [
  { id: "current", label: "🔥 Lista Actual" },
  { id: "history", label: "📅 Historial" },
  { id: "overview", label: "📊 Vista General" },
  { id: "names", label: "📋 Todas las Listas" },
  { id: "search", label: "🔍 Buscar Libro" },
  { id: "reviews", label: "✍️ Reseñas" },
];  