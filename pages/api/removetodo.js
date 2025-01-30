import pool from './db.js'; 

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });  
    }
    console.log(req.body);
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ message: "Id is required" }); 
    }

    try {
        const [removeTodo] = await pool.query("DELETE FROM todos WHERE id = ?", [id])
        return res.status(200).json({ message: "removed" });  
    } catch (error) {
        console.error("Database error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
