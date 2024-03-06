"use client";

import { Order } from "@/database/schema";
import { dbUpdateVictim } from "@/resources/actions";
import { useRouter } from "next/navigation";

export default function KillInfo(props: { order: Order }) {
  const router = useRouter();
  const victim = props.order.victim;

  if (victim == null) {
    return null;
  }
  return (
    <div>
      <h1 className="text-2xl">Player: {props.order.killer}</h1>
      <h1 className="text-xl my-4">You have to kill: {props.order.victim}</h1>
    </div>
  );
}
