import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/NavBar.css";

export default function NavBar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: "/", label: "Accueil" },
    { to: "/about", label: "À propos" },
    { to: "/projects", label: "Projets" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          Alireza<span>.dev</span>
          <em>Future Cyber</em>
        </Link>
      </div>

      <button className="burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
        <span></span><span></span><span></span>
      </button>

      <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
        {links.map((l) => (
          <li key={l.to}>
            <Link
              to={l.to}
              className={location.pathname === l.to ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          </li>
        ))}
        {user && (
          <>
            <li><Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link></li>
            <li>
              <button className="logout-btn" onClick={logout}>Déconnexion</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
