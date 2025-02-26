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
    const { name, password } = req.body;

    try {
        const [users] = await db.query("SELECT * FROM users WHERE name = ?", [name]);
        if (users.length === 0) return res.status(404).json({ message: "User not found" });

        const userRecord = users[0];

        const isPasswordValid = await bcrypt.compare(password, userRecord.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: userRecord.id, name: userRecord.name }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
