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
    return <h1 className="text-2xl">You have won the game!</h1>;
  }
  if (order.victim == null) {
    return <h1 className="text-2xl">You have been killed</h1>;
  }
  return (
    <div>
      <h1 className="text-2xl">Player: {order.killer}</h1>
      <h1 className="text-xl my-4">You have to kill: {order.victim}</h1>
      <KillButton order={order} />
    </div>
  );
}
