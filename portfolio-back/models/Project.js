import pool from "../config/db.js";

const Project = {
  getAll: async () => {
    const [rows] = await pool.query("SELECT * FROM projects ORDER BY created_at DESC");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await pool.query("SELECT * FROM projects WHERE id = ?", [id]);
    return rows[0];
  },

  create: async ({ name, description, technologies, github_url, demo_url, image_url }) => {
    const [result] = await pool.query(
      "INSERT INTO projects (name, description, technologies, github_url, demo_url, image_url) VALUES (?, ?, ?, ?, ?, ?)",
      [name, description, technologies, github_url, demo_url, image_url]
    );
    return result;
  },

  update: async (id, { name, description, technologies, github_url, demo_url, image_url }) => {
    const [result] = await pool.query(
      "UPDATE projects SET name=?, description=?, technologies=?, github_url=?, demo_url=?, image_url=? WHERE id=?",
      [name, description, technologies, github_url, demo_url, image_url, id]
    );
    return result;
  },

  delete: async (id) => {
    const [result] = await pool.query("DELETE FROM projects WHERE id = ?", [id]);
    return result;
  },
};

export default Project;
