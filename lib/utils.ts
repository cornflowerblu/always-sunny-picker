export function safelyParseJSON(json: string) {
  let parsed;

  try {
    parsed = JSON.parse(json);
  } catch (e) {
    console.error('Badly formatted JSON. Cannot parse!');
    return {};
  }

  return parsed;
}