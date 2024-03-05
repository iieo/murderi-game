"use client";

import { dbUpdateVictim } from "@/resources/actions";
import { useRouter } from "next/navigation";

export default function KillButton(props: {
  order: { gameId: string; killer: string; victim: string };
}) {
  const router = useRouter();

  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 p-4"
      onClick={async () => {
        await dbUpdateVictim(
          props.order.gameId,
          props.order.killer,
          props.order.victim
        );
        router.refresh();
      }}
    >
      Killed
    </button>
  );
}
