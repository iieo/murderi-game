import { dbGetVictim, dbUpdateVictim } from "@/resources/actions";
import KillButton from "./killbutton";

export default async function SharePage({
  params,
}: {
  params: { gameId: string; player: string };
}) {
  const orders = await dbGetVictim(params.gameId, params.player);

  if (orders.length != 1) {
    return <h1>Player not found</h1>;
  }
  const order = orders[0];
  if (order.killer == order.victim) {
    return <h1>You have won the game!</h1>;
  }
  return (
    <div>
      <h1>Player: {order.killer}</h1>
      <h1>You have to kill: {order.victim}</h1>
      <KillButton order={order} />
    </div>
  );
}
