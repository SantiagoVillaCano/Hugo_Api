import { useState, useEffect } from "react";
import { styles } from "../../styles/styles";
import { fetchNYT } from "../../utils/api";
import { LIST_NAME } from "../../constants";

export default function CurrentList({ dark }) {
  const s = styles(dark);
  const [books, setBooks] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchNYT(`/lists/current/${LIST_NAME}.json`)
      .then((d) => { setMeta(d.results); setBooks(d.results.books || []); })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={s.loading}>⏳ Cargando lista...</div>;
  if (error) return <div style={s.error}>⚠️ {error}</div>;

  return (
    <div>
      <h2 style={s.sectionTitle}>Young Adult Hardcover</h2>
      <p style={s.sectionSub}>
        Semana del {meta?.bestsellers_date} · Publicado el {meta?.published_date} · {books.length} títulos
      </p>
      <div style={s.booksGrid}>
        {books.map((b) => (
          <div
            key={b.primary_isbn13}
            style={{ ...s.bookCard, boxShadow: selected?.primary_isbn13 === b.primary_isbn13 ? "0 0 0 3px #f97316" : "none" }}
            onClick={() => setSelected(selected?.primary_isbn13 === b.primary_isbn13 ? null : b)}
          >
            <div style={s.bookRank}>{b.rank}</div>
            <img
              src={b.book_image || "https://via.placeholder.com/200x300?text=Sin+portada"}
              alt={b.title}
              style={s.bookImg}
              onError={(e) => { e.target.src = "https://via.placeholder.com/200x300/f97316/ffffff?text=NYT"; }}
            />
            <div style={s.bookBody}>
              <div style={s.bookTitle}>{b.title}</div>
              <div style={s.bookAuthor}>{b.author}</div>
              <div style={s.bookWeeks}>📆 {b.weeks_on_list} sem. en lista</div>
              {selected?.primary_isbn13 === b.primary_isbn13 && (
                <div style={s.bookDesc}>{b.description}</div>
              )}
            </div>
          </div>
        ))}
      </div>
      {selected && (
        <div style={{ ...s.reviewCard, marginTop: 32 }}>
          <strong style={{ color: "#f97316" }}>{selected.title}</strong> — {selected.author}
          <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.7 }}>{selected.description}</p>
          {selected.amazon_product_url && (
            <a href={selected.amazon_product_url} target="_blank" rel="noopener noreferrer"
              style={{ color: "#f97316", fontSize: 13, fontFamily: "Arial, sans-serif", display: "block", marginTop: 10 }}>
              Ver en Amazon →
            </a>
          )}
        </div>
      )}
    </div>
  );
}