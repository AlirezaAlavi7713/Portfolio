import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaTrash, FaEdit, FaPlus, FaEnvelope } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";
import "../styles/Admin.css";

const emptyForm = { name: "", description: "", technologies: "", github_url: "", demo_url: "" };

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [image, setImage] = useState(null);
  const [tab, setTab] = useState("projects");

  useEffect(() => {
    if (!user) return navigate("/admin/login");
    fetchProjects();
    fetchMessages();
  }, [user]);

  const fetchProjects = async () => {
    const res = await api.get("/projects");
    setProjects(res.data);
  };

  const fetchMessages = async () => {
    const res = await api.get("/contact");
    setMessages(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    if (image) data.append("image", image);

    try {
      if (editId) {
        await api.put(`/projects/${editId}`, data, { headers: { "Content-Type": "multipart/form-data" } });
        toast.success("Projet mis à jour !");
      } else {
        await api.post("/projects", data, { headers: { "Content-Type": "multipart/form-data" } });
        toast.success("Projet créé !");
      }
      setForm(emptyForm);
      setEditId(null);
      setImage(null);
      fetchProjects();
    } catch {
      toast.error("Erreur lors de la sauvegarde");
    }
  };

  const handleEdit = (project) => {
    setEditId(project.id);
    setForm({
      name: project.name,
      description: project.description || "",
      technologies: project.technologies || "",
      github_url: project.github_url || "",
      demo_url: project.demo_url || "",
    });
    setTab("projects");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Supprimer ce projet ?")) return;
    try {
      await api.delete(`/projects/${id}`);
      toast.success("Projet supprimé");
      fetchProjects();
    } catch {
      toast.error("Erreur lors de la suppression");
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!confirm("Supprimer ce message ?")) return;
    try {
      await api.delete(`/contact/${id}`);
      toast.success("Message supprimé");
      fetchMessages();
    } catch {
      toast.error("Erreur");
    }
  };

  return (
    <main className="admin">
      <h1>Tableau de bord</h1>

      <div className="admin-tabs">
        <button className={tab === "projects" ? "active" : ""} onClick={() => setTab("projects")}>
          Projets
        </button>
        <button className={tab === "messages" ? "active" : ""} onClick={() => setTab("messages")}>
          Messages <span className="badge">{messages.length}</span>
        </button>
      </div>

      {tab === "projects" && (
        <>
          <motion.form
            className="admin-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2>{editId ? "Modifier le projet" : "Nouveau projet"}</h2>
            {["name", "description", "technologies", "github_url", "demo_url"].map((field) => (
              <div className="form-group" key={field}>
                <label>{field.replace("_", " ")}</label>
                {field === "description" ? (
                  <textarea
                    value={form[field]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    rows={3}
                    placeholder={field === "technologies" ? "React, Node.js, MySQL" : ""}
                  />
                ) : (
                  <input
                    type="text"
                    value={form[field]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  />
                )}
              </div>
            ))}
            <div className="form-group">
              <label>Image du projet</label>
              <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                <FaPlus /> {editId ? "Mettre à jour" : "Ajouter"}
              </button>
              {editId && (
                <button type="button" className="btn-secondary" onClick={() => { setForm(emptyForm); setEditId(null); }}>
                  Annuler
                </button>
              )}
            </div>
          </motion.form>

          <div className="projects-list">
            {projects.map((p) => (
              <div className="admin-project-item" key={p.id}>
                <div>
                  <strong>{p.name}</strong>
                  <span>{p.technologies}</span>
                </div>
                <div className="item-actions">
                  <button onClick={() => handleEdit(p)}><FaEdit /></button>
                  <button onClick={() => handleDelete(p.id)} className="danger"><FaTrash /></button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === "messages" && (
        <div className="messages-list">
          {messages.length === 0 && <p className="no-msg">Aucun message reçu.</p>}
          {messages.map((m) => (
            <motion.div
              className="message-card"
              key={m.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="message-header">
                <span><FaEnvelope /> <strong>{m.name}</strong> — {m.email}</span>
                <button onClick={() => handleDeleteMessage(m.id)} className="danger"><FaTrash /></button>
              </div>
              <p>{m.message}</p>
              <small>{new Date(m.created_at).toLocaleDateString("fr-FR")}</small>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
}
