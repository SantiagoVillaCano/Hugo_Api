import { styles } from "../styles/styles";
import { ENDPOINTS } from "../constants";

export default function Navbar({ dark, tab, setTab }) {
  const s = styles(dark);
  return (
    <nav style={s.nav}>
      <div style={s.navInner}>
        {ENDPOINTS.map((e) => (
          <button key={e.id} style={s.navBtn(tab === e.id)} onClick={() => setTab(e.id)}>
            {e.label}
          </button>
        ))}
      </div>
    </nav>
  );
}