"use client";

import { Order } from "@/database/schema";
import { dbUpdateVictim } from "@/resources/actions";
import { useRouter } from "next/navigation";

export default function KillButton(props: { order: Order }) {
  const router = useRouter();
  const victim = props.order.victim;
  
  if (victim == null) {
    return null;
  }
  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 p-4"
      onClick={async () => {
        await dbUpdateVictim(props.order.gameId, props.order.killer, victim);
        router.refresh();
      }}
    >
      Killed
    </button>
  );
}
