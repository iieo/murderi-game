import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// 9MglvX0wpu3AXQZQ

const db = drizzle(pool);
export default db;
