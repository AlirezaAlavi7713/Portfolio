import pool from "../config/db.js";

const Message = {
  create: async ({ name, email, message }) => {
    const [result] = await pool.query(
      "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)",
      [name, email, message]
    );
    return result;
  },

  getAll: async () => {
    const [rows] = await pool.query("SELECT * FROM messages ORDER BY created_at DESC");
    return rows;
  },

  delete: async (id) => {
    const [result] = await pool.query("DELETE FROM messages WHERE id = ?", [id]);
    return result;
  },
};

export default Message;
