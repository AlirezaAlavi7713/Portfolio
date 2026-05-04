import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>Alireza Alavi &mdash; Développeur Web & Web Mobile</p>
      <div className="footer-links">
        <a href="https://github.com/AlirezaAlavi7713" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
        <a href="https://www.linkedin.com/in/alireza-alavi-154a28372/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
        <a href="/contact" aria-label="Contact"><FaEnvelope /></a>
      </div>
      <p className="footer-copy">&copy; {new Date().getFullYear()} — Tous droits réservés</p>
    </footer>
  );
}
