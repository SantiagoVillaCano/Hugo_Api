import { useState } from "react";
import { styles } from "../../styles/styles";
import { fetchNYT } from "../../utils/api";
import { LIST_NAME } from "../../constants";

export default function History({ dark }) {
  const s = styles(dark);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const search = async () => {
    if (!query.trim()) return;
    setLoading(true); setError(null); setSearched(true);
    try {
      const d = await fetchNYT("/lists/best-sellers/history.json", {
        title: query, "lists-filter": LIST_NAME,
      });
      setResults(d.results || []);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  const maxWeeks = Math.max(...results.map((r) =>
    r.ranks_history?.reduce((m, rh) => Math.max(m, rh.weeks_on_list || 0), 0) || 0
  ), 1);

  return (
    <div>
      <h2 style={s.sectionTitle}>Historial de Best Sellers</h2>
      <p style={s.sectionSub}>Busca cualquier libro y ve cuántas semanas estuvo en la lista</p>
      <div style={s.inputRow}>
        <input style={s.input} placeholder="Título del libro..." value={query}
          onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && search()} />
        <button style={s.btn} onClick={search}>Buscar</button>
      </div>
      {loading && <div style={s.loading}>🔍 Buscando historial...</div>}
      {error && <div style={s.error}>⚠️ {error}</div>}
      {!loading && searched && results.length === 0 && <div style={s.error}>No se encontraron resultados.</div>}
      {results.map((book, i) => {
        const totalWeeks = book.ranks_history?.reduce((m, rh) => Math.max(m, rh.weeks_on_list || 0), 0) || 0;
        return (
          <div key={i} style={s.historyItem}>
            <img src={book.book_image || "https://via.placeholder.com/80x120/f97316/ffffff?text=NYT"}
              alt={book.title} style={{ width: 80, height: 120, objectFit: "cover", borderRadius: 2, flexShrink: 0 }}
              onError={(e) => { e.target.src = "https://via.placeholder.com/80x120/f97316/ffffff?text=NYT"; }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{book.title}</div>
              <div style={{ color: "#f97316", fontSize: 13, fontFamily: "Arial, sans-serif", marginBottom: 4 }}>{book.author}</div>
              <div style={{ fontSize: 12, color: dark ? "#666" : "#aaa", fontFamily: "Arial, sans-serif", marginBottom: 8 }}>
                {book.publisher}
              </div>
              {totalWeeks > 0 && (
                <>
                  <div style={{ fontSize: 12, fontFamily: "Arial, sans-serif", color: dark ? "#888" : "#666", marginBottom: 4 }}>
                    Máx. semanas en lista: <strong style={{ color: "#f97316" }}>{totalWeeks}</strong>
                  </div>
                  <div style={{ background: dark ? "#1f1f1f" : "#f0ede8", height: 6, borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ ...s.weeksBar, width: `${Math.min((totalWeeks / maxWeeks) * 100, 100)}%` }} />
                  </div>
                </>
              )}
              {book.description && <p style={{ fontSize: 13, color: dark ? "#888" : "#666", marginTop: 8, fontStyle: "italic", lineHeight: 1.5 }}>{book.description}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}