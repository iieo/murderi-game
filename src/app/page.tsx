"use client";

import { dbInsertOrder } from "@/resources/actions";
import { createOrders, generateRandomLetters } from "@/resources/utils";
import { useRouter } from "next/navigation";
import { FormEvent, FormEventHandler, useEffect, useState } from "react";

export default function JoinGame() {
  const [gameId, setGameId] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    router.push(`/${gameId}`);
  };

  return (
    <div className="flex flex-col bg-blue-500 p-24 rounded">
      <h1 className="my-4 text-xl">GameId: {gameId}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
          type="text"
          className="bg-blue-600 text-white rounded px-2 py-1"
          placeholder="Enter game id"
        />

        <button
          className="bg-blue-600 p-4 my-4 hover:bg-blue-700"
          type="submit"
        >
          Join
        </button>
        <button
          className="bg-blue-600 p-4 my-4 hover:bg-blue-700"
          type="button"
          onClick={() => router.push("/create")}
        >
          Create
        </button>
      </form>
    </div>
  );
}
