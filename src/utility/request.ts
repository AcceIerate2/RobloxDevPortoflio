const apiEndpoint = "https://games.roblox.com/v1/games?universeIds="

export default async function(universeId: string) {
  const endpoint = `${apiEndpoint}${universeId}`;
  const response = await fetch(endpoint);
  const json = await response.json();

  if (!json.data || json.data.length === 0) {
    throw new Error("Game not found");
  }

  const game = json.data[0];
  return {
    ccu: game.playing,   
    visits: game.visits, 
  };
}