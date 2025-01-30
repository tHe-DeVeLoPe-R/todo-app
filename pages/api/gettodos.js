import pool from './db.js'; 

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });  
    }

    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ message: "Username is required" }); 
    }

    try {
        const [rows] = await pool.query("SELECT * FROM todos WHERE username = ?", [username]);
        
        return res.status(200).json({ message: rows });  
    } catch (error) {
        console.error("Database error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
