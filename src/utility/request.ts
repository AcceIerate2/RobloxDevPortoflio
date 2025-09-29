export default async function(universeId: string) {
  const response = await fetch(`/api/game/${universeId}`);
  const json = await response.json();
  return json;
}
