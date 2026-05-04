import Project from "../models/Project.js";

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.getAll();
    res.json(projects);
  } catch {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.getById(req.params.id);
    if (!project) return res.status(404).json({ message: "Projet introuvable" });
    res.json(project);
  } catch {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const createProject = async (req, res) => {
  try {
    const { name, description, technologies, github_url, demo_url } = req.body;
    if (!name) return res.status(400).json({ message: "Le nom est requis" });

    const image_url = req.file ? `/uploads/${req.file.filename}` : null;
    await Project.create({ name, description, technologies, github_url, demo_url, image_url });
    res.status(201).json({ message: "Projet créé" });
  } catch {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { name, description, technologies, github_url, demo_url } = req.body;
    const existing = await Project.getById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Projet introuvable" });

    const image_url = req.file ? `/uploads/${req.file.filename}` : existing.image_url;
    await Project.update(req.params.id, { name, description, technologies, github_url, demo_url, image_url });
    res.json({ message: "Projet mis à jour" });
  } catch {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const existing = await Project.getById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Projet introuvable" });
    await Project.delete(req.params.id);
    res.json({ message: "Projet supprimé" });
  } catch {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
