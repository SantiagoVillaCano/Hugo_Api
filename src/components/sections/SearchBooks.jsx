import { useState } from "react";
import { styles } from "../../styles/styles";
import { fetchNYT } from "../../utils/api";

export default function SearchBooks({ dark }) {
  const s = styles(dark);
  const [query, setQuery] = useState("");
  const [author, setAuthor] = useState("");
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
      const d = await fetchNYT("/lists/best-sellers/history.json", params);
      setResults(d.results || []);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div>
      <h2 style={s.sectionTitle}>Buscar en el NYT Books</h2>
      <p style={s.sectionSub}>Busca por título o autor en todo el historial de best sellers</p>
      <div style={s.inputRow}>
        <input style={s.input} placeholder="Título..." value={query}
          onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && search()} />
        <input style={s.input} placeholder="Autor..." value={author}
          onChange={(e) => setAuthor(e.target.value)} onKeyDown={(e) => e.key === "Enter" && search()} />
        <button style={s.btn} onClick={search}>Buscar</button>
      </div>
      {loading && <div style={s.loading}>🔍 Buscando...</div>}
      {error && <div style={s.error}>⚠️ {error}</div>}
      {!loading && searched && results.length === 0 && <div style={s.error}>No se encontraron resultados.</div>}
      <div style={s.booksGrid}>
        {results.map((b, i) => (
          <div key={i} style={s.bookCard}>
            <img src={b.book_image || "https://via.placeholder.com/200x300/f97316/ffffff?text=NYT"}
              alt={b.title} style={s.bookImg}
              onError={(e) => { e.target.src = "https://via.placeholder.com/200x300/f97316/ffffff?text=NYT"; }} />
            <div style={s.bookBody}>
              <div style={s.bookTitle}>{b.title}</div>
              <div style={s.bookAuthor}>{b.author}</div>
              <div style={{ fontSize: 11, color: dark ? "#555" : "#aaa", fontFamily: "Arial, sans-serif", marginBottom: 4 }}>{b.publisher}</div>
              {b.ranks_history?.length > 0 && (
                <div style={{ ...s.tag, display: "inline-block", marginTop: 4 }}>{b.ranks_history.length} aparición(es)</div>
              )}
              {b.description && <div style={s.bookDesc}>{b.description}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}