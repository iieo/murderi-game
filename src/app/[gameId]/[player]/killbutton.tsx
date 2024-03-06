"use client";

import { Order } from "@/database/schema";
import { dbUpdateVictim } from "@/resources/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function KillButton(props: { order: Order }) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const victim = props.order.victim;

  if (victim == null) {
    return null;
  }
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <button
      className="bg-blue-500 hover:bg-blue-600 p-4"
      disabled={isLoading}
      onClick={async () => {
        if (!isLoading) {
          setLoading(true);
          await dbUpdateVictim(props.order.gameId, props.order.killer, victim);
          router.refresh();
          await new Promise((res) => setTimeout(res, 2000));
          setLoading(false);
        }
      }}
    >
      Killed
    </button>
  );
}
