import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function KilledPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>You have been killed</CardTitle>
        <CardDescription>Thus you are out of the game</CardDescription>
      </CardHeader>
    </Card>
  );
}
