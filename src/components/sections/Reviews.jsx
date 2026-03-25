import { useState } from "react";
import { styles } from "../../styles/styles";
import { fetchNYT } from "../../utils/api";

export default function Reviews({ dark }) {
  const s = styles(dark);
  const [query, setQuery] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const search = async () => {
    setLoading(true); setError(null); setSearched(true);
    try {
      const params = {};
      if (query.trim()) params.title = query.trim();
      if (author.trim()) params.author = author.trim();
      if (isbn.trim()) params.isbn = isbn.trim();
      const d = await fetchNYT("/reviews.json", params);
      setResults(d.results || []);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div>
      <h2 style={s.sectionTitle}>Reseñas Literarias NYT</h2>
      <p style={s.sectionSub}>Busca reseñas publicadas en The New York Times Book Review</p>
      <div style={s.inputRow}>
        <input style={s.input} placeholder="Título..." value={query}
          onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && search()} />
        <input style={s.input} placeholder="Autor..." value={author}
          onChange={(e) => setAuthor(e.target.value)} onKeyDown={(e) => e.key === "Enter" && search()} />
        <input style={{ ...s.input, maxWidth: 160 }} placeholder="ISBN..." value={isbn}
          onChange={(e) => setIsbn(e.target.value)} onKeyDown={(e) => e.key === "Enter" && search()} />
        <button style={s.btn} onClick={search}>Buscar</button>
      </div>
      {loading && <div style={s.loading}>✍️ Buscando reseñas...</div>}
      {error && <div style={s.error}>⚠️ {error}</div>}
      {!loading && searched && results.length === 0 && <div style={s.error}>No se encontraron reseñas.</div>}
      {results.map((r, i) => (
        <div key={i} style={s.reviewCard}>
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div style={{ flexShrink: 0, width: 40, height: 40, background: "#f97316", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>✍️</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{r.book_title}</div>
              <div style={{ color: "#f97316", fontSize: 13, fontFamily: "Arial, sans-serif", marginBottom: 4 }}>{r.book_author}</div>
              {r.byline && <div style={{ fontSize: 13, color: dark ? "#888" : "#666", fontFamily: "Arial, sans-serif", marginBottom: 6 }}>Reseña por: {r.byline}</div>}
              {r.summary && <p style={{ fontSize: 14, lineHeight: 1.7, color: dark ? "#bbb" : "#333", marginBottom: 8 }}>{r.summary}</p>}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                <span style={s.tag}>{r.publication_dt}</span>
                {r.book_review_link && (
                  <a href={r.book_review_link} target="_blank" rel="noopener noreferrer"
                    style={{ color: "#f97316", fontSize: 13, fontFamily: "Arial, sans-serif" }}>
                    Leer reseña completa →
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}