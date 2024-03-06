"use client";

import { dbInsertOrder } from "@/resources/actions";
import { createOrders, generateRandomLetters } from "@/resources/utils";
import { useRouter } from "next/navigation";
import { FormEvent, FormEventHandler, useEffect, useState } from "react";

export default function CreateGame() {
  const [player, setPlayer] = useState("");
  const [players, setPlayers] = useState<string[]>([]);
  const [gameId, setGameId] = useState("");
  const router = useRouter();
  useEffect(() => {
    setGameId(generateRandomLetters());
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (players.length < 3) {
      alert("You need more players");
      return;
    }
    const orders = createOrders(players);
    for (const order of orders) {
      await dbInsertOrder(gameId, order.killer, order.victim);
    }
    router.push(`/share/${gameId}`);
  };

  return (
    <div className="flex flex-col bg-blue-500 p-24 rounded">
      <h1 className="my-4 text-xl">GameId: {gameId}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          value={player}
          onChange={(e) => setPlayer(e.target.value)}
          type="text"
          className="bg-blue-600 text-white rounded px-2 py-1"
          placeholder="Enter player name"
        />

        <button
          className="bg-blue-600 p-4 mt-4 hover:bg-blue-700"
          type="button"
          onClick={() => {
            setPlayers([...players, player]);
            setPlayer("");
          }}
        >
          Add
        </button>
        <button
          className="bg-blue-600 p-4 my-4 hover:bg-blue-700"
          type="submit"
        >
          Create game
        </button>
        <button
          className="bg-blue-600 p-4 my-4 hover:bg-blue-700"
          type="button"
          onClick={() =>
            setPlayers([
              "Leo",
              "Andi",
              "Cici",
              "Frudl",
              "Jakob",
              "Joni",
              "Lars",
              "Loui",
              "Riedl",
              "Sammer",
              "Steff",
              "Tania",
              "Tom",
            ])
          }
        >
          Load default
        </button>
      </form>

      <p>Players:</p>
      {players.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}
