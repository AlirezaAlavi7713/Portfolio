import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email et mot de passe requis" });

    const user = await User.findByEmail(email);
    if (!user) return res.status(401).json({ message: "Identifiants incorrects" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Identifiants incorrects" });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email et mot de passe requis" });

    const existing = await User.findByEmail(email);
    if (existing) return res.status(409).json({ message: "Email déjà utilisé" });

    const hash = await bcrypt.hash(password, 12);
    await User.create(email, hash);
    res.status(201).json({ message: "Compte admin créé" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
