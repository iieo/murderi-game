import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function KilledPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>You have been killed</CardTitle>
        <CardDescription>Thus you are out of the game</CardDescription>
      </CardHeader>

      <CardFooter className="flex flex-col">
        <Link href={"/"}>Back home</Link>
      </CardFooter>
    </Card>
  );
}
