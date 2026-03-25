import { useState, useEffect } from "react";
import { styles } from "../../styles/styles";
import { fetchNYT } from "../../utils/api";
import { LIST_NAME } from "../../constants";

export default function AllLists({ dark }) {
  const s = styles(dark);
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchNYT("/lists/names.json")
      .then((d) => setLists(d.results || []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = lists.filter((l) =>
    l.display_name?.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) return <div style={s.loading}>📋 Cargando listas...</div>;
  if (error) return <div style={s.error}>⚠️ {error}</div>;

  return (
    <div>
      <h2 style={s.sectionTitle}>Todas las Listas NYT</h2>
      <p style={s.sectionSub}>{lists.length} listas disponibles</p>
      <div style={s.inputRow}>
        <input style={{ ...s.input, maxWidth: 360 }} placeholder="Filtrar listas..."
          value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>
      {filtered.map((l, i) => (
        <div key={i} style={s.listRow}>
          <div style={{ ...s.tag, background: l.list_name_encoded === LIST_NAME ? "#f97316" : undefined, color: l.list_name_encoded === LIST_NAME ? "#fff" : undefined }}>
            {l.list_name_encoded === LIST_NAME ? "★ SELECCIONADA" : l.updated}
          </div>
          <div>
            <div style={{ fontWeight: l.list_name_encoded === LIST_NAME ? 700 : 500, fontSize: 14, color: l.list_name_encoded === LIST_NAME ? "#f97316" : undefined }}>
              {l.display_name}
            </div>
            <div style={{ fontSize: 11, color: dark ? "#555" : "#aaa", fontFamily: "Arial, sans-serif", marginTop: 2 }}>
              {l.list_name_encoded} · Más antigua: {l.oldest_published_date}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}