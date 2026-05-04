import { motion } from "framer-motion";
import { FaGithub, FaArrowRight } from "react-icons/fa";
import STATIC_PROJECTS from "../data/projects";
import "../styles/Projects.css";

export default function Projects() {
  const projects = STATIC_PROJECTS;

  return (
    <main className="projects">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Mes Projets
      </motion.h1>
      <motion.p
        className="projects-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Applications full-stack construites lors de ma formation et en autodidacte.
      </motion.p>

      <div className="projects-grid">
        {projects.map((project, i) => (
          <motion.div
            className="project-card"
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
          >
            <div className="project-img-wrapper">
              {project.image_url ? (
                <img
                  src={project.image_url.startsWith("/") ? project.image_url : `http://localhost:3000${project.image_url}`}
                  alt={project.name}
                  className="project-img"
                />
              ) : (
                <div className="project-img-placeholder">
                  <span>{project.emoji || "💻"}</span>
                </div>
              )}
            </div>
            <div className="project-body">
              {project.period && <span className="project-period">{project.period}</span>}
              <h2>{project.name}</h2>
              <p className="project-desc">{project.description}</p>
              <div className="project-tags">
                {(typeof project.technologies === "string"
                  ? project.technologies.split(",")
                  : []
                ).map((tech) => (
                  <span key={tech.trim()} className="tag">{tech.trim()}</span>
                ))}
              </div>
              <div className="project-footer">
                <div className="project-links">
                  {project.github_url && (
                    <a href={project.github_url} target="_blank" rel="noreferrer">
                      <FaGithub /> Front
                    </a>
                  )}
                  {project.github_back_url && (
                    <a href={project.github_back_url} target="_blank" rel="noreferrer">
                      <FaGithub /> Back
                    </a>
                  )}
                  {!project.github_back_url && !project.github_url && !project.demo_url && (
                    <span className="no-link">Projet local</span>
                  )}
                </div>
                {(project.demo_url || project.github_url) && (
                  <a
                    href={project.demo_url || project.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-view"
                  >
                    Voir le projet <FaArrowRight />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
