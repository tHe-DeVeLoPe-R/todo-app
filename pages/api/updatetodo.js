import pool from './db.js'

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { id, title, desc, username } = req.body;

        try {
            const [result] = await pool.query(
                "UPDATE todos SET title = ?, description = ? WHERE id = ? AND username = ?",
                [title, desc, id, username]
            );

            if (result.affectedRows > 0) {
                return res.status(200).json({ message: "Todo updated successfully!" });
            } else {
                return res.status(400).json({ message: "Failed to update todo." });
            }
        } catch (error) {
            console.error("Error updating todo:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}