function sanitizeSongName(songName: string) {
  // Match parenthesis or brackets with live or numbers inside
  // Match anything after a hiphen
  const regex = /\s*[([{][^)}\]]*(live|[0-9])[^)}\]]*[)\]}]|-\s*(.*)/gi;

  const result = songName.replace(regex, '').trim();
  return result;
}

export function getSongInfoFrom(offsetParent: Element) {
  let artistNameElement = offsetParent.querySelector<HTMLAnchorElement>(
    'a[href^="/artist/"]',
  );
  let songNameElement =
    offsetParent.querySelector<HTMLAnchorElement>('a[href^="/track/"]');

  if (!artistNameElement) {
    if (location.href.includes('artist')) {
      artistNameElement = document.querySelector(
        'span[data-testid="entityTitle"]',
      );
    }

    if (location.href.includes('track')) {
      artistNameElement = document.querySelector(
        'a[data-testid="creator-link"]',
      );
    }
  }

  if (!songNameElement) {
    songNameElement = offsetParent.querySelector(
      '[data-testid="context-item-link"]',
    );
    if (location.href.includes('queue')) {
      songNameElement = offsetParent.querySelector(
        'div[data-encore-id="type"]',
      );
    }
  }

  const songName = songNameElement?.innerText
    ? sanitizeSongName(songNameElement?.innerText)
    : null;
  const artistName = artistNameElement?.innerText ?? null;

  if (songName === null || artistName === null) {
    throw new Error(
      'Something went wrong trying to get songName and artistName',
    );
  }

  return {
    songName,
    artistName,
  };
}
