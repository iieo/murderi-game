"use client"
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  EmailShareButton,
  WhatsappShareButton,
} from "react-share";
import { EmailIcon, WhatsappIcon } from "react-share"; 
import { useRouter } from "next/navigation";


export default function SharePage({ params }: { params: { gameId: string } }) {
  const router = useRouter();
  const gameId = params.gameId;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your game id: {params.gameId}</CardTitle>
        <CardDescription>Share the game id with your friends</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <EmailShareButton url={`Join my murderi game: ${gameId}`}>
          <EmailIcon size={48} round={true} className="mx-4" />
        </EmailShareButton>
        <WhatsappShareButton url={`Join my murderi game: ${gameId}`}>
          <WhatsappIcon size={48} round={true} className="mx-4" />
        </WhatsappShareButton>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button onClick={()=>{
          router.push(`/game/${gameId}`)
        }}>Join the game</Button>
      </CardFooter>
    </Card>
  );
}
