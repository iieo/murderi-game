export function generateRandomLetters(length: number = 4): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charactersLength = characters.length;
  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

type Order = {
  killer: string;
  victim: string;
};

export function createOrders(players: string[]) {
  if (players.length === 0) {
    return [];
  }

  const orders: Order[] = [];

  const shuffledPlayers = players.slice().sort(() => 0.5 - Math.random());

  for (let i = 0; i < shuffledPlayers.length; i++) {
    const currentPlayer = shuffledPlayers[i];
    const nextIndex = (i + 1) % shuffledPlayers.length;
    const victimPlayer = shuffledPlayers[nextIndex];

    orders.push({ killer: currentPlayer, victim: victimPlayer });
  }

  return orders;
}
