import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FaEnvelope, FaMapMarkerAlt, FaLinkedin } from "react-icons/fa";
import api from "../api/api";
import "../styles/Contact.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message)
      return toast.error("Veuillez remplir tous les champs");

    setLoading(true);
    try {
      await api.post("/contact", form);
      toast.success("Message envoyé ! Je vous réponds rapidement.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.error("Erreur lors de l'envoi. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="contact">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Contact
      </motion.h1>

      <div className="contact-wrapper">
        <motion.div
          className="contact-info"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2>Parlons-en !</h2>
          <p>
            Disponible pour une alternance en cybersécurité (Bac+3/4) ou tout projet de développement web.
          </p>
          <div className="info-item">
            <FaMapMarkerAlt /> <span>Lille, France</span>
          </div>
          <div className="info-item">
            <FaEnvelope />
            <a href="mailto:alirezaalavi7713@gmail.com">alirezaalavi7713@gmail.com</a>
          </div>
          <div className="info-item">
            <FaLinkedin />
            <a href="https://www.linkedin.com/in/alireza-alavi-154a28372/" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </motion.div>

        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Votre nom"
              value={form.name}
              onChange={handleChange}
              maxLength={100}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="votre@email.com"
              value={form.email}
              onChange={handleChange}
              maxLength={200}
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={6}
              placeholder="Votre message..."
              value={form.message}
              onChange={handleChange}
              maxLength={2000}
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Envoi en cours..." : "Envoyer le message"}
          </button>
        </motion.form>
      </div>
    </main>
  );
}
