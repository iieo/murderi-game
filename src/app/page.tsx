"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { dbInsertOrder } from "@/resources/actions";
import { createOrders, generateRandomLetters } from "@/resources/utils";
import { useRouter } from "next/navigation";
import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type FormInputs ={
  gameId: string;
}

export default function JoinGame() {
  const router = useRouter();
  const form = useForm<FormInputs>();

  const handleSubmit = async (data: FormInputs) => {
    const gameId = data.gameId;
    router.push(`/game/${gameId}`);
  };

  const handleCreateGame = ()=>{
    router.push('/create');
  }

  return (
    <div className="flex flex-col">
      <Card>
        <CardHeader>
          <CardTitle>Murdery Game</CardTitle>
          <CardDescription>
            Enter your game id or create a new game
          </CardDescription>
        </CardHeader>
      </Card>
      <Separator className="my-4" />
      <div className="flex flex-wrap justify-center sm:flex-no-wrap">
        <Card className="my-4 w-full">
          <CardHeader>
            <CardTitle>Join Game</CardTitle>
            <CardDescription>Join an existing game</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col"
              >
                <FormField
                  control={form.control}
                  name="gameId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GameId</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your game id..." {...field} />
                      </FormControl>
                      <FormDescription className="my-2">
                        Receive the game id from the person which created the
                        game.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Join Game</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Separator orientation="vertical" className="m-2" />
        <Card className="my-4 w-full">
          <CardHeader>
            <CardTitle>Create Game</CardTitle>
            <CardDescription>Create your own game</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col">
            <Button onClick={handleCreateGame}>Create a new game</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
/*

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
    </div>*/