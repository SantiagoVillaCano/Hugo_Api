export default function Footer({ dark }) {
  return (
    <footer style={{
      textAlign: "center",
      padding: "24px",
      borderTop: `1px solid ${dark ? "#1f1f1f" : "#e8e8e0"}`,
      fontSize: 12,
      fontFamily: "Arial, sans-serif",
      color: dark ? "#444" : "#bbb",
      letterSpacing: "0.05em",
    }}>
      Powered by <span style={{ color: "#f97316" }}>NYT Books API</span> · Ejercicio de Consumo de APIs
    </footer>
  );
}