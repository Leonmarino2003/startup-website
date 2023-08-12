export async function fetchAddress(coords) {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords.lng},${coords.lat}.json?access_token=${process.env.NEXT_PUBLIC_MB_ACCESS_TOKEN}`
  );
  const result = await response.json();
  //console.log("Fetch address result:", result);

  return result;
}
