import { connectToDatabase } from '../../db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const connection = await connectToDatabase();
            const [rows] = await connection.query('SELECT * FROM todos');
            await connection.end();
            res.status(200).json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Database query failed' });
        }
    }
}
