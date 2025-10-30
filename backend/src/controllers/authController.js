import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../app.js";

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: "User already exists" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, passwordHash },
    });

    return res.status(201).json({ id: user.id, email: user.email });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}
