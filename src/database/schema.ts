import { pgTable, uuid, text, varchar } from "drizzle-orm/pg-core";

export const orderSchema = pgTable("order", {
  id: text("id").primaryKey().notNull(),
  gameId: text("game_id").notNull(),
  killer: text("killer").notNull(),
  victim: text("victim").notNull(),
});

export type Order = typeof orderSchema.$inferSelect;
