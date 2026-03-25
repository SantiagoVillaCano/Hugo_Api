import { useState, useEffect } from "react";
import { styles } from "../../styles/styles";
import { fetchNYT } from "../../utils/api";
import { LIST_NAME } from "../../constants";

export default function Overview({ dark }) {
  const s = styles(dark);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNYT("/lists/overview.json")
      .then((d) => setData(d.results))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={s.loading}>📊 Cargando vista general...</div>;
  if (error) return <div style={s.error}>⚠️ {error}</div>;

  const yaList = data?.lists?.find((l) => l.list_name_encoded === LIST_NAME);

  return (
    <div>
      <h2 style={s.sectionTitle}>Vista General NYT</h2>
      <p style={s.sectionSub}>Publicado el {data?.published_date} · Semana del {data?.bestsellers_date}</p>
      {yaList && (
        <div style={s.overviewSection}>
          <h3 style={{ color: "#f97316", fontFamily: "Arial, sans-serif", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
            🎯 Young Adult Hardcover — Top {yaList.books?.length}
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 16 }}>
            {yaList.books?.slice(0, 5).map((b, i) => (
              <div key={i} style={{ ...s.bookCard, padding: 14 }}>
                <div style={{ ...s.bookRank, position: "static", width: 24, height: 24, fontSize: 11, marginBottom: 8 }}>{b.rank}</div>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4, lineHeight: 1.3 }}>{b.title}</div>
                <div style={{ color: "#f97316", fontSize: 11, fontFamily: "Arial, sans-serif" }}>{b.author}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      <hr style={s.divider} />
      <h3 style={{ fontFamily: "Arial, sans-serif", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: dark ? "#888" : "#666", marginBottom: 16 }}>
        Todas las Listas esta Semana ({data?.lists?.length})
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
        {data?.lists?.map((l, i) => (
          <div key={i} style={{ background: dark ? "#141414" : "#ffffff", border: `1px solid ${dark ? "#222" : "#e8e8e0"}`, borderRadius: 4, padding: "12px 14px" }}>
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{l.list_name}</div>
            <div style={{ fontSize: 11, color: dark ? "#555" : "#aaa", fontFamily: "Arial, sans-serif" }}>
              {l.books?.length} libros
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}