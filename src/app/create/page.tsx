"use client";

import { dbInsertOrder } from "@/resources/actions";
import { createOrders, generateRandomLetters } from "@/resources/utils";
import { useRouter } from "next/navigation";
import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

type FormInputs = {
  playerName: string;
};

export default function CreateGame() {
  const [players, setPlayers] = useState<string[]>([]);
  const [gameId, setGameId] = useState("");
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<FormInputs>();

  useEffect(() => {
    setGameId(generateRandomLetters());
  }, []);

  const handleSubmit = (data: FormInputs) => {
    const playerName = data.playerName;
    if (!playerName || playerName.length < 3) {
      toast.error("Invalid player name", {
        description: "Please type in a longer player name",
      });
    } else {
      setPlayers([...players, playerName]);
      form.setValue("playerName", "");
    }
  };

  const handleCreateGame = async () => {
    if (players.length < 3) {
      toast.error("More players needed", {
        description: "Please add more players to start the game",
      });
    } else {
      const orders = createOrders(players);
      for (const order of orders) {
        await dbInsertOrder(gameId, order.killer, order.victim);
      }
      router.push(`/share/${gameId}`);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Game: {gameId}</CardTitle>
          <CardDescription>
            This is your game id. You can share it with your friends later
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Add players</CardTitle>
          <CardDescription>
            The more players in the game the more fun it is to play
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col"
            >
              <FormField
                control={form.control}
                name="playerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add a player</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter player name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="mt-4">
                Add player
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Create game</CardTitle>
          <CardDescription>
            Submit the game and share the game id with your friends
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col">
          <Button className="mt-4" onClick={handleCreateGame}>
            Create game
          </Button>
        </CardContent>
      </Card>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Current players</CardTitle>
          <CardDescription>This is a list of all players. Current amount: {players.length}</CardDescription>
        </CardHeader>
        <CardContent>
          {players.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
