import { styles } from "../styles/styles";

export default function Header({ dark, setDark }) {
  const s = styles(dark);
  return (
    <header style={s.header}>
      <div style={s.headerInner}>
        <div style={s.logo}>
          <span style={s.logoTop}>The New York Times</span>
          <span style={s.logoTitle}>Books Explorer</span>
          <span style={s.logoBadge}>Young Adult Hardcover</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 12, fontFamily: "Arial, sans-serif", color: dark ? "#666" : "#aaa", letterSpacing: "0.05em" }}>
            {dark ? "Modo Oscuro" : "Modo Claro"}
          </span>
          <button style={s.toggleBtn} onClick={() => setDark(!dark)}>
            <div style={s.toggleKnob}>{dark ? "🌙" : "☀️"}</div>
          </button>
        </div>
      </div>
    </header>
  );
}