import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaGithub, FaLinkedin, FaEnvelope, FaArrowDown,
  FaReact, FaNodeJs, FaShieldAlt, FaStripe, FaTools, FaCode
} from "react-icons/fa";
import { SiVite, SiExpress, SiMysql, SiJsonwebtokens, SiJest, SiFigma } from "react-icons/si";
import STATIC_PROJECTS from "../data/projects";
import "../styles/Home.css";

const TITLES = [
  "Développeur Web & Web Mobile",
  "Future Cybersecurity Expert",
  "Full-Stack JavaScript",
];

const uniqueTechs = new Set(
  STATIC_PROJECTS.flatMap((p) =>
    typeof p.technologies === "string" ? p.technologies.split(",").map((t) => t.trim()) : []
  )
);

const STATS = [
  { value: STATIC_PROJECTS.length.toString(), label: "Projets réalisés" },
  { value: "2", label: "Diplômes obtenus" },
  { value: `${uniqueTechs.size}+`, label: "Technologies utilisées" },
  { value: "Lille", label: "Basé à" },
];

const TECHS = [
  { name: "React 19",          icon: <FaReact />,         color: "#06b6d4" },
  { name: "Vite",              icon: <SiVite />,           color: "#a259ff" },
  { name: "Node.js",           icon: <FaNodeJs />,         color: "#68a063" },
  { name: "Express 5",         icon: <SiExpress />,        color: "#d4a853" },
  { name: "MySQL2",            icon: <SiMysql />,          color: "#00758f" },
  { name: "REST API",          icon: <FaCode />,           color: "#94a3b8" },
  { name: "Architecture MVC",  icon: <FaTools />,          color: "#d4a853" },
  { name: "JWT Auth",          icon: <SiJsonwebtokens />,  color: "#f59e0b" },
  { name: "bcrypt",            icon: <FaShieldAlt />,      color: "#7c3aed" },
  { name: "RBAC Middlewares",  icon: <FaShieldAlt />,      color: "#7c3aed" },
  { name: "Stripe Checkout",   icon: <FaStripe />,         color: "#635bff" },
  { name: "Webhooks Stripe",   icon: <FaStripe />,         color: "#635bff" },
  { name: "Jest",              icon: <SiJest />,           color: "#c21325" },
  { name: "Figma",             icon: <SiFigma />,          color: "#f24e1e" },
];

const ATOUTS = [
  {
    icon: "⚡",
    title: "Full-Stack JS",
    desc: "Du frontend React au backend Node.js/Express, je construis des applications complètes avec une architecture MVC propre et des API REST sécurisées.",
    color: "var(--accent2)",
  },
  {
    icon: "🔐",
    title: "Sécurité Web",
    desc: "JWT, bcrypt, RBAC, middlewares personnalisés, protection des routes — la sécurité est intégrée dès la conception, pas ajoutée après.",
    color: "var(--gold)",
  },
  {
    icon: "🚀",
    title: "Ambition & Curiosité",
    desc: "Arrivé en France sans parler français, autodidacte en informatique, futur expert en cybersécurité. Je transforme les défis en opportunités.",
    color: "var(--accent)",
  },
];

const PARTICLE_COUNT = 8;

function ParticleCard({ tech }) {
  const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const angle = (360 / PARTICLE_COUNT) * i;
    const delay = (i / PARTICLE_COUNT) * 2;
    const size = 3 + Math.random() * 3;
    return { angle, delay, size };
  });

  return (
    <div className="tech-flat-card particle-card" style={{ "--tech-color": tech.color }}>
      <span className="tech-flat-icon" style={{ color: tech.color }}>
        {tech.icon}
        {particles.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={{
              "--angle": `${p.angle}deg`,
              "--delay": `${p.delay.toFixed(2)}s`,
              "--size": `${p.size.toFixed(1)}px`,
              "--color": tech.color,
            }}
          />
        ))}
      </span>
      <span className="tech-flat-name">{tech.name}</span>
    </div>
  );
}

function WaveGrid() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const COLS = 7;

  const getDistance = useCallback((i, j) => {
    const ri = Math.floor(i / COLS), ci = i % COLS;
    const rj = Math.floor(j / COLS), cj = j % COLS;
    return Math.sqrt((ri - rj) ** 2 + (ci - cj) ** 2);
  }, []);

  return (
    <div className="tech-flat-grid">
      {TECHS.map((tech, i) => {
        const dist = hoveredIndex !== null ? getDistance(i, hoveredIndex) : null;
        const delay = dist !== null ? dist * 0.07 : 0;
        const active = dist !== null && dist < 4;
        const intensity = dist !== null ? Math.max(0, 1 - dist / 4) : 0;
        return (
          <div
            key={tech.name}
            className={`tech-flat-card wave-card${active ? " wave-active" : ""}`}
            style={{
              "--tech-color": tech.color,
              "--wave-delay": `${delay.toFixed(2)}s`,
              "--wave-intensity": intensity,
            }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <span className="tech-flat-icon" style={{ color: tech.color }}>{tech.icon}</span>
            <span className="tech-flat-name">{tech.name}</span>
          </div>
        );
      })}
    </div>
  );
}

function TiltCard({ tech }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const card = ref.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -14;
    const rotateY = ((x - cx) / cx) * 14;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.06)`;
    card.querySelector(".tilt-glare").style.background =
      `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.18), transparent 70%)`;
  };

  const handleMouseLeave = () => {
    const card = ref.current;
    card.style.transform = `perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)`;
    card.querySelector(".tilt-glare").style.background = "transparent";
  };

  return (
    <div
      ref={ref}
      className="tech-flat-card"
      style={{ "--tech-color": tech.color }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="tilt-glare" />
      <span className="tech-flat-icon" style={{ color: tech.color }}>{tech.icon}</span>
      <span className="tech-flat-name">{tech.name}</span>
    </div>
  );
}

export default function Home() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const current = TITLES[titleIndex];
    let timeout;
    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 65);
      } else {
        timeout = setTimeout(() => setTyping(false), 2200);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
      } else {
        setTitleIndex((prev) => (prev + 1) % TITLES.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, titleIndex]);

  return (
    <>

      <main className="home">
        {/* ── HERO ── */}
        <section className="hero">
          <motion.div
            className="hero-photo-wrapper"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
          >
            <div className="photo-ring-outer" />
            <div className="photo-ring-inner" />
            <img src="/images/photo.jpg" alt="Alireza Alavi" className="hero-photo" />
          </motion.div>

          <motion.div
            className="hero-text"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <p className="hero-greeting">Bonjour, je suis</p>
            <h1 className="hero-name">
              Alireza <span className="gold">Alavi</span>
            </h1>
            <p className="hero-title">
              {displayed}<span className="cursor">|</span>
            </p>
            <p className="hero-desc">
              Développeur full-stack passionné, diplômé Bac+2 à Lille. Je construis des applications sécurisées et performantes — et je me forme activement à la <span className="gold">cybersécurité</span>.
            </p>
            <div className="hero-buttons">
              <Link to="/projects" className="btn-primary">Voir mes projets</Link>
              <Link to="/contact" className="btn-secondary">Me contacter</Link>
            </div>
            <div className="hero-socials">
              <a href="https://github.com/AlirezaAlavi7713" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
              <a href="https://www.linkedin.com/in/alireza-alavi-154a28372/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href="/contact" aria-label="Email"><FaEnvelope /></a>
            </div>
          </motion.div>
        </section>

        {/* ── STATS ── */}
        <section className="stats-bar">
          {STATS.map((s, i) => (
            <motion.div
              className="stat-item"
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </motion.div>
          ))}
        </section>

        <div className="scroll-hint">
          <FaArrowDown />
        </div>

        {/* ── TECH STACK ── */}
        <section className="tech-section">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Stack & Compétences</h2>
            <p className="section-sub">Technologies maîtrisées dans des projets réels</p>
          </motion.div>

          <div className="tech-laser-wrapper">
            <div className="laser-beam" />
            <div className="tech-flat-grid">
              {TECHS.map((tech, i) => (
                <div
                  key={tech.name}
                  className="tech-flat-card"
                  style={{ "--tech-color": tech.color }}
                >
                  <span className="tech-flat-icon" style={{ color: tech.color }}>{tech.icon}</span>
                  <span className="tech-flat-name">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ATOUTS ── */}
        <section className="atouts-section">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Ce que j'apporte</h2>
            <p className="section-sub">Mes points forts au service de vos projets</p>
          </motion.div>

          <div className="atouts-grid">
            {ATOUTS.map((a, i) => (
              <motion.div
                className="atout-card"
                key={a.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                style={{ "--card-color": a.color }}
              >
                <span className="atout-icon">{a.icon}</span>
                <h3 style={{ color: a.color }}>{a.title}</h3>
                <p>{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <motion.section
          className="cta-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2>Disponible pour une alternance <span className="gold">Cybersécurité</span></h2>
          <p>Je recherche une alternance Bac+3/4 dans le domaine de la cybersécurité. <br />Parlons de votre projet ou de vos besoins !</p>
          <Link to="/contact" className="btn-primary">Prendre contact</Link>
        </motion.section>
      </main>
    </>
  );
}
