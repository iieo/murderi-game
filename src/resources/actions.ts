"use server";
import db from "@/database";
import { orderSchema } from "@/database/schema";
import { and, eq } from "drizzle-orm";

export async function dbInsertOrder(
  gameId: string,
  killer: string,
  victim: string
) {
  await db.insert(orderSchema).values({ gameId, killer, victim });
}
export async function dbGetVictim(gameId: string, killer: string) {
  return await db
    .select()
    .from(orderSchema)
    .where(and(eq(orderSchema.gameId, gameId), eq(orderSchema.killer, killer)));
}
export async function dbUpdateVictim(gameId: string, player: string) {
  //the player2 which had player as victim will now have the victim of player

  const orders = await dbGetVictim(gameId, player);
  if (orders.length != 1) {
    throw new Error("Invalid amount returned: " + orders);
  }
  const order = orders[0];
  const victim = order.victim;
  if (victim == null) {
    throw new Error("Victim is null");
  }
  await db
    .update(orderSchema)
    .set({ victim })
    .where(and(eq(orderSchema.gameId, gameId), eq(orderSchema.victim, player)));
  await db
    .update(orderSchema)
    .set({ victim: null })
    .where(and(eq(orderSchema.gameId, gameId), eq(orderSchema.killer, player)));
}

export async function dbGetPlayers(gameId: string) {
  return await db
    .select()
    .from(orderSchema)
    .where(eq(orderSchema.gameId, gameId));
}
