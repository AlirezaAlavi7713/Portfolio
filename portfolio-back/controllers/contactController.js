import nodemailer from "nodemailer";
import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ message: "Tous les champs sont requis" });

    try { await Message.create({ name, email, message }); } catch {}

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        });
        await transporter.sendMail({
          from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_USER,
          subject: `Nouveau message de ${name}`,
          html: `
            <h2>Nouveau message depuis ton portfolio</h2>
            <p><strong>Nom :</strong> ${name}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Message :</strong></p>
            <p>${message}</p>
          `,
        });
      } catch (emailErr) {
        console.error("Email non envoyé :", emailErr.message);
      }
    }

    res.json({ message: "Message envoyé avec succès" });
  } catch (err) {
    console.error("Contact error:", err.message);
    res.status(500).json({ message: "Erreur lors de l'envoi du message" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.getAll();
    res.json(messages);
  } catch {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    await Message.delete(req.params.id);
    res.json({ message: "Message supprimé" });
  } catch {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
