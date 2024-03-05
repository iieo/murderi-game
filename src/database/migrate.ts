import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const databaseUrl = process.env.DATABASE_URL;

if (databaseUrl === undefined) {
  process.exit(1);
}

const databaseConnection = drizzle(
  postgres(databaseUrl, { ssl: "require", max: 1 }),
);

const main = async () => {
  try {
    await migrate(databaseConnection, {
      migrationsFolder: "./src/database/migrations",
    });
    console.log("Migrations ran successfully");
  } catch (error) {
    console.error(error);
  }
  process.exit(0);
};

main()
  .then(() => {})
  .catch(() => {});
