export function fetchFilter(result) {
  let filter = false;

  if (!result) {
    filter = true;
    return filter;
  }

  if (
    !result.features[0] ||
    !result.features[1] ||
    !result.features[2] ||
    !result.features[3] ||
    !result.features[4]
  ) {
    filter = true;
    return filter;
  }

  if (
    result.features[0].properties.accuracy === "street" ||
    result.features[0].properties.accuracy === undefined ||
    result.features[0].properties.category != undefined ||
    result.features[0].properties.landmark != undefined ||
    result.features[0].wikidata != undefined ||
    result.features[0].address === undefined ||
    result.features[0].place_type[0] === "poi"
  ) {
    filter = true;
  }

  return filter;
}
