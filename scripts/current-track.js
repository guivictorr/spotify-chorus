const currentTrackSelectors = {
  currentSongName:
    'div[data-testid="context-item-info-title"] a[data-testid="context-item-link"]',
  currentArtistName:
    'div[data-testid="context-item-info-subtitles"] a[data-testid="context-item-info-artist"]',
  nowPlayingWidget: 'div[data-testid="now-playing-widget"]',
};

function getSongInfoFromCurrentTrack() {
  const currentSongName = document.querySelector(
    currentTrackSelectors.currentSongName
  )?.innerText;
  const sanitizedCurrentSongName = sanitizeSongName(currentSongName);
  const currentArtistName = document.querySelector(
    currentTrackSelectors.currentArtistName
  )?.innerText;

  return {
    currentSongName: sanitizedCurrentSongName,
    currentArtistName,
  };
}

function addChorusLinkToCurrentTrack() {
  const playingWidget = document.querySelector(
    currentTrackSelectors.nowPlayingWidget
  );
  const chorusLinkElement = playingWidget.querySelector(
    ".chorus-current-track"
  );
  const { currentArtistName, currentSongName } = getSongInfoFromCurrentTrack();
  const chorusHref = buildChorusHref(currentSongName, currentArtistName);

  if (chorusLinkElement) {
    chorusLinkElement.setAttribute("href", chorusHref);
    return;
  }

  const chorusLink = createChorusLink(chorusHref);
  chorusLink.classList.add("chorus-current-track");
  playingWidget.appendChild(chorusLink);
}
