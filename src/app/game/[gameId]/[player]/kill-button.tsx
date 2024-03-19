"use client";

import { Button } from "@/components/ui/button";
import { Order } from "@/database/schema";
import { dbUpdateVictim } from "@/resources/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function KillButton(props: { gameId: string; player: string }) {
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        await dbUpdateVictim(props.gameId, props.player);
        router.push("/game/killed");
      }}
      className="w-full"
    >
      I have been killed
    </Button>
  );
}
