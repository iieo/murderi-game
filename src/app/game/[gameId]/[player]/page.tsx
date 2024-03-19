import { dbGetVictim, dbUpdateVictim } from "@/resources/actions";
import KillButton from "./kill-button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function PlayerPage({
  params,
}: {
  params: { gameId: string; player: string };
}) {
  const gameId = params.gameId;
  const player = params.player;
  const orders = await dbGetVictim(gameId, player);
  if (orders.length != 1) {
    return <h1>Player not found</h1>;
  }
  const order = orders[0];
  if (order.killer == order.victim) {
    return <h1 className="text-2xl">You have won the game!</h1>;
  }
  if (order.victim == null) {
    redirect("/game/killed");
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Kill order</CardTitle>
        <CardDescription>
          Kill the person by giving them anything
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Your target: {order.victim}</p>
      </CardContent>
      <CardFooter className="flex flex-col">
        <KillButton gameId={gameId} player={player} />
      </CardFooter>
    </Card>
  );
}
