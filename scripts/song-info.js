function sanitizeSongName(songName) {
  // Match parenthesis or brackets with live or numbers inside
  // Match anything after a hiphen
  const regex = /\s*[([{][^)}\]]*(live|[0-9])[^)}\]]*[)\]}]|-\s*(.*)/gi;

  const result = songName.replace(regex, "").trim();
  return result;
}

function getSongInfoFrom(offsetParent) {
  let artistName = offsetParent.querySelector('a[href^="/artist/"]');
  let songName = offsetParent.querySelector('a[href^="/track/"]');

  if (!artistName) {
    if (location.href.includes("artist")) {
      artistName = document.querySelector('span[data-testid="entityTitle"]');
    }

    if (location.href.includes("track")) {
      artistName = document.querySelector('a[data-testid="creator-link"]');
    }
  }

  if (!songName) {
    songName = offsetParent.querySelector('[data-testid="context-item-link"]');
    if (location.href.includes("queue")) {
      songName = offsetParent.querySelector('div[data-encore-id="type"]');
    }
  }

  return {
    songName: sanitizeSongName(songName?.innerText),
    artistName: artistName?.innerText,
  };
}
