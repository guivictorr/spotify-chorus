const trackRowSelectors = {
  trackListRow: 'div[data-testid="tracklist-row"]',
  trackListRowSongName: 'a[data-testid="internal-track-link"]',
  trackListRowArtistName:
    'div[data-testid="tracklist-row"] a[href^="/artist/"]',
  artistNameFallback: 'span[data-testid="entityTitle"]',
};

function getSongInfoFromTrackRow(trackRow) {
  const songName = trackRow.querySelector(
    trackRowSelectors.trackListRowSongName
  )?.innerText;
  const sanitizedSongName = sanitizeSongName(songName);

  const artistName = trackRow.querySelector(
    trackRowSelectors.trackListRowArtistName
  )?.innerText;
  const artistNameFallback = document.querySelector(
    trackRowSelectors.artistNameFallback
  )?.innerText;

  return {
    songName: sanitizedSongName,
    artistName: artistName ?? artistNameFallback,
  };
}

function addChorusLink(trackRow) {
  const lastDivFromTrackRow = trackRow.lastChild;

  const { songName, artistName } = getSongInfoFromTrackRow(trackRow);
  const chorusHref = buildChorusHref(songName, artistName);

  const chorusLink = createChorusLink(chorusHref);
  lastDivFromTrackRow.appendChild(chorusLink);
}
