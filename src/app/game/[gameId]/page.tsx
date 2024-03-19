import { dbGetPlayers } from "@/resources/actions";
import Link from "next/link";

export default async function GamePlayers({
  params,
}: {
  params: { gameId: string };
}) {
  const players = (await dbGetPlayers(params.gameId)).map((p) => p.killer);
  return (
    <div className="bg-blue-500 p-6 rounded">
      <h1 className="text-2xl">GameId: {params.gameId}</h1>

      <h2>Select your player</h2>
      {players.map((player) => (
        <div key={player} className="border-2 my-4 flex">
          <p className="p-4">{player}</p>
          <Link
            href={`/${params.gameId}/${player}`}
            className="flex flex-col text-lg text-center p-4 bg-blue-500 hover:bg-blue-600"
          >
            Select
          </Link>
        </div>
      ))}
    </div>
  );
}
