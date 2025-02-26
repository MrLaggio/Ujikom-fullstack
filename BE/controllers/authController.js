import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/database.js";

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);
        res.json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const login = async (req, res) => {
    const { name,email, password } = req.body;

    try {
        const [user] = await db.query("SELECT * FROM users WHERE name = ?", [name]);
        if (!user.length) return res.status(400).json({ message: "User not found" });

        const validPass = await bcrypt.compare(password, user[0].password);
        if (!validPass) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user[0].id, isAdmin: user[0].isAdmin }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
