import pool from './db.js';
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
    
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }
    const {username, password} = req.body;
    console.log(username);
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        const [existing_user] = await pool.query("SELECT * FROM users WHERE username = ?", [username])
        if (existing_user.length > 0) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);
        return res.json({ message: "User created successfully" });
    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
