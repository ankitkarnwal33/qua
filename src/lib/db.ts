import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  waitForConnections: true,
  connectionLimit: 50,
  queueLimit: 0,
});

export async function query(sql: string, params: string[]) {
  const [results] = await pool.execute(sql, params);
  console.log("running");
  return results;
}

export default pool;
