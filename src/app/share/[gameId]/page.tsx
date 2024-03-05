import Link from "next/link";

export default function SharePage({ params }: { params: { gameId: string } }) {
  return (
    <div>
      <div className="bg-blue-500 p-6 rounded">
        <h1 className="text-2xl">GameId: {params.gameId}</h1>
      </div>
      <Link
        href={`/${params.gameId}`}
        className="flex flex-col text-lg text-center m-4 p-2 bg-blue-500 hover:bg-blue-600"
      >
        Join
      </Link>
    </div>
  );
}
