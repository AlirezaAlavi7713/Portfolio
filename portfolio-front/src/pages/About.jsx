import { motion } from "framer-motion";
import { FaBriefcase, FaGraduationCap, FaMapMarkerAlt, FaShieldAlt } from "react-icons/fa";
import "../styles/About.css";

const timeline = [
  {
    year: "2018",
    icon: <FaMapMarkerAlt />,
    title: "Arrivée en France",
    desc: "Je suis arrivé en France en 2018 sans parler un seul mot de français. Seul, dans un pays inconnu, j'ai dû apprendre la langue, les codes culturels et m'adapter à un nouvel environnement — le tout en même temps. Ce défi m'a forgé une résilience et une capacité d'adaptation qui me suivent encore aujourd'hui.",
    type: "life",
  },
  {
    year: "2018 – 2020",
    icon: <FaBriefcase />,
    title: "Employé polyvalent — Papa Rafaelle, Lille",
    desc: "Mon premier emploi en France, en restauration. En deux ans, j'ai appris le français en conditions réelles, développé mon sens du service et du travail en équipe. Un socle humain essentiel : la ponctualité, la rigueur et la capacité à gérer la pression d'un service.",
    type: "work",
  },
  {
    year: "2020 – 2022",
    icon: <FaBriefcase />,
    title: "Chef de rang — Chez Brigitte, Vieux-Lille",
    desc: "Évolution significative : je prends du galon et deviens chef de rang, avec de vraies responsabilités managériales. Je coordonnais et encadrais des équipes allant jusqu'à 5 personnes, gérais l'organisation du service, la satisfaction client et la formation des nouveaux arrivants. Une expérience qui m'a appris le leadership et la prise de décision.",
    type: "work",
  },
  {
    year: "2023 – 2024",
    icon: <FaGraduationCap />,
    title: "Formation Plombier Thermique — Alternance",
    desc: "Une reconversion dans le bâtiment avec une formation d'un an en alternance (1 semaine école / 3 semaines entreprise). Diplôme obtenu. Mais malgré cet investissement, j'ai compris que ce métier ne correspondait pas à ma vocation profonde. Cette expérience m'a appris à ne pas avoir peur de me remettre en question.",
    type: "education",
  },
  {
    year: "Sept. 2024",
    icon: <FaGraduationCap />,
    title: "Découverte de l'informatique — Simplon Lille",
    desc: "Formation d'un mois de découverte du monde informatique à Simplon Lille. Le déclic. Dès les premiers jours, j'ai su que c'était là que je voulais aller. La logique, la créativité, la résolution de problèmes — tout me parlait naturellement.",
    type: "education",
  },
  {
    year: "Mars – Mai 2025",
    icon: <FaGraduationCap />,
    title: "Formation développement — Simplon Lens",
    desc: "Deux mois de formation intensive pour consolider mes bases en développement. Initiation aux langages du web, apprentissage des bonnes pratiques, travail en équipe sur des projets concrets. Ma progression s'accélère.",
    type: "education",
  },
  {
    year: "Mai – Juil. 2025",
    icon: <FaGraduationCap />,
    title: "Formation Front-End",
    desc: "Formation de deux mois axée sur le développement front-end. Approfondissement de React, maîtrise des composants, gestion du state, intégration d'API et travail sur des projets de plus en plus complexes. Ma stack frontend prend forme.",
    type: "education",
  },
  {
    year: "Août 2025 – Avr. 2026",
    icon: <FaGraduationCap />,
    title: "Bac+2 Développeur Web & Web Mobile — Diplômé",
    desc: "Formation certifiante de 8 mois incluant un stage d'un mois en entreprise. J'y ai maîtrisé le développement full-stack : React 19, Node.js, Express, MySQL, architecture MVC, JWT, bcrypt, Stripe, Jest. Diplôme Bac+2 obtenu. Cette formation a transformé ma passion en compétences professionnelles réelles.",
    type: "education",
  },
  {
    year: "Aujourd'hui",
    icon: <FaShieldAlt />,
    title: "Recherche alternance Cybersécurité — Bac+3/4",
    desc: "Le développement web m'a ouvert les yeux sur un domaine qui me passionne encore plus : la sécurité informatique. Je recherche activement une alternance d'un an en cybersécurité pour obtenir un Bac+3/4, avant de poursuivre avec un Master 2 ans également en alternance. Mon objectif : devenir un expert capable de concevoir des systèmes sécurisés de bout en bout.",
    type: "next",
  },
];

export default function About() {
  return (
    <main className="about">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        À propos de moi
      </motion.h1>

      <motion.div
        className="about-intro-block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p>
          Je m'appelle <strong>Alireza Alavi</strong>, développeur web full-stack basé à Lille. Mon parcours est atypique : arrivé en France en 2018 sans parler la langue, j'ai traversé la restauration, le bâtiment, avant de trouver ma véritable voie dans l'informatique.
        </p>
        <p>
          Ce que l'on retient rarement des CV, c'est la force que ça demande. Apprendre le français seul, changer de métier deux fois, repartir de zéro à chaque fois — et à chaque fois, en ressortir plus solide. Aujourd'hui, développeur diplômé Bac+2, je me tourne avec conviction vers la <strong>cybersécurité</strong>, un domaine qui combine ma rigueur technique et mon goût pour les défis complexes.
        </p>
        <p>
          Je suis quelqu'un qui n'abandonne pas. Et ça, ça ne s'apprend pas dans un cours.
        </p>
      </motion.div>

      <section className="timeline">
        {timeline.map((item, i) => (
          <motion.div
            className={`timeline-item ${item.type}`}
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="timeline-icon">{item.icon}</div>
            <div className="timeline-content">
              <span className="timeline-year">{item.year}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
