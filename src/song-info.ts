function sanitizeSongName(songName?: string | null) {
  if (!songName) return null;
  // Match parenthesis or brackets with live or numbers inside
  // Match anything after a hiphen
  const regex = /\s*[([{][^)}\]]*(live|[0-9])[^)}\]]*[)\]}]|-\s*(.*)/gi;

  const result = songName.replace(regex, '').trim();
  return result;
}

export function getSongInfoFrom(offsetParent: Element) {
  const songNameElement = offsetParent.querySelector(
    'a[data-testid="context-item-link"], a[data-testid="internal-track-link"], a[href^="/track"]',
  );
  const artistNameElement = Array.from(
    document.querySelectorAll('a[href^="/artist"]'),
  ).shift();

  const songName = sanitizeSongName(songNameElement?.textContent);
  const artistName = artistNameElement?.textContent ?? null;

  return {
    songName,
    artistName,
  };
}
