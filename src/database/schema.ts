import { pgTable, uuid, text, varchar } from "drizzle-orm/pg-core";

export const orderSchema = pgTable("order", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  gameId: text("game_id").notNull(),
  killer: text("killer").notNull(),
  victim: text("victim"),
});

export type Order = typeof orderSchema.$inferSelect;
