import { dbGetPlayers } from "@/resources/actions";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default async function GamePlayers({
  params,
}: {
  params: { gameId: string };
}) {
  const getListItem = (player:string)=>{
    return (
      <Link href={`/game/${params.gameId}/${player}`} className="w-full mb-4" key={player}>
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <p>{player}</p>
              <Separator orientation="vertical" className="mx-4" />
              <p>Select</p>
            </div>
          </CardHeader>
        </Card>
      </Link>
    );
  }

  const players = (await dbGetPlayers(params.gameId)).map((p) => p.killer);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Select your player</CardTitle>
        <CardDescription>Game id: {params.gameId}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {players.map(player=>getListItem(player))}
      </CardContent>
    </Card>
  );
}
