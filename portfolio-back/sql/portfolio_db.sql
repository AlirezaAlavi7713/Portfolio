-- Base de données Portfolio — Alireza Alavi
CREATE DATABASE IF NOT EXISTS portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE portfolio_db;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin') DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  technologies VARCHAR(500),
  github_url VARCHAR(500),
  demo_url VARCHAR(500),
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projets de départ
INSERT INTO projects (name, description, technologies, github_url, demo_url, image_url) VALUES
(
  'Hotel Harmony',
  'Application de réservation hôtelière complète avec gestion des chambres, réservations et paiements. Interface client et espace administrateur.',
  'React,Node.js,Express,MySQL,JWT',
  '',
  '',
  NULL
),
(
  'Allo Ciné',
  'Plateforme de consultation de films et séances de cinéma. Recherche de films, affichage des horaires et réservation de places.',
  'React,Node.js,Express,MySQL',
  '',
  '',
  NULL
),
(
  'CRS',
  'Application web développée dans le cadre de ma formation Bac+2 en développement web et web mobile.',
  'React,Node.js,Express,MySQL',
  '',
  '',
  NULL
);
