# 🧑‍💻 Portfolio — Alireza Alavi

Portfolio personnel full-stack présentant mes projets, compétences et parcours. Inclut un espace d'administration sécurisé pour gérer le contenu.

## Fonctionnalités

**Côté visiteur**
- Page d'accueil avec présentation et effet Matrix
- Liste des projets avec liens GitHub
- Page "À propos" avec compétences et parcours
- Formulaire de contact avec envoi d'email

**Espace admin**
- Authentification sécurisée (JWT)
- Gestion des projets (ajout, modification, suppression)
- Upload d'images
- Gestion des messages reçus

## Stack technique

| Côté | Technologies |
|------|-------------|
| Frontend | React, Vite, React Router DOM, Framer Motion, Axios |
| Backend | Node.js, Express, MySQL, JWT, bcrypt |
| Sécurité | Helmet, HPP, express-rate-limit, express-validator |
| Email | Nodemailer |
| Upload | Multer |

## Structure du projet

```
Portfolio/
├── portfolio-front/   # Application React
└── portfolio-back/    # API Express
```

## Installation

**Backend**
```bash
cd portfolio-back
npm install
cp .env.example .env    # Remplir les variables
npm run dev             # http://localhost:3000
```

**Frontend**
```bash
cd portfolio-front
npm install
npm run dev             # http://localhost:5175
```

## Variables d'environnement (Back)

```
PORT=3000
DB_HOST=localhost
DB_USER=
DB_PASSWORD=
DB_NAME=portfolio_db
JWT_SECRET=
EMAIL_USER=
EMAIL_PASS=
FRONTEND_URL=http://localhost:5175
```
