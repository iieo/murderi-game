"use server";
import db from "@/database";
import { orderSchema } from "@/database/schema";
import { and, eq, inArray } from "drizzle-orm";

export async function dbInsertOrder(
  gameId: string,
  killer: string,
  victim: string
) {
  await db
    .insert(orderSchema)
    .values({ id: `${gameId}${killer}`, gameId, killer, victim });
}
export async function dbGetVictim(gameId: string, killer: string) {
  return await db
    .select()
    .from(orderSchema)
    .where(and(eq(orderSchema.gameId, gameId), eq(orderSchema.killer, killer)));
}
export async function dbUpdateVictim(
  gameId: string,
  killer: string,
  killed: string
) {
  const killedPeople = await dbGetVictim(gameId, killed);
  if (killedPeople.length == 1) {
    const newVictim = killedPeople[0].victim;
    await db
      .update(orderSchema)
      .set({ victim: newVictim })
      .where(
        and(eq(orderSchema.gameId, gameId), eq(orderSchema.killer, killer))
      );
  } else {
    throw new Error("Invalid amount returned: " + killedPeople);
  }
}

export async function dbGetPlayers(gameId: string) {
  return await db
    .select()
    .from(orderSchema)
    .where(eq(orderSchema.gameId, gameId));
}
