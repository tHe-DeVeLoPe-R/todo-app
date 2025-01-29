import mysql from "mysql2/promise";

// Create a connection pool for efficient database access
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Export the database pool so it can be used in API routes
export default pool;
