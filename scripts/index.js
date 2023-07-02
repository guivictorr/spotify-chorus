const selectors = {
  trackListRow: 'div[data-testid="tracklist-row"]',
  trackListRowSongName: 'a[data-testid="internal-track-link"]',
  trackListRowArtistName:
    'div[data-testid="tracklist-row"] a[href^="/artist/"]',
  artistNameFallback: 'span[data-testid="entityTitle"]',
  currentSongName:
    'div[data-testid="context-item-info-title"] a[data-testid="context-item-link"]',
  currentArtistName:
    'div[data-testid="context-item-info-subtitles"] a[data-testid="context-item-info-artist"]',
  nowPlayingWidget: 'div[data-testid="now-playing-widget"]',
};

// Functions to get Song Info from a track row or current playing widget

function getSongInfoFromCurrentTrack() {
  const currentSongName = document.querySelector(
    selectors.currentSongName
  )?.innerText;
  const sanitizedCurrentSongName = sanitizeSongName(currentSongName);
  const currentArtistName = document.querySelector(
    selectors.currentArtistName
  )?.innerText;

  return {
    currentSongName: sanitizedCurrentSongName,
    currentArtistName,
  };
}

function getSongInfoFromTrackRow(trackRow) {
  const songName = trackRow.querySelector(
    selectors.trackListRowSongName
  )?.innerText;
  const sanitizedSongName = sanitizeSongName(songName);

  const artistName = trackRow.querySelector(
    selectors.trackListRowArtistName
  )?.innerText;
  const artistNameFallback = document.querySelector(
    selectors.artistNameFallback
  )?.innerText;

  return {
    songName: sanitizedSongName,
    artistName: artistName ?? artistNameFallback,
  };
}

// Append Chorus Link to track rows and current track widget

function addChorusLinkToCurrentTrack() {
  const playingWidget = document.querySelector(selectors.nowPlayingWidget);
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

function addChorusLink(trackRow) {
  const lastDivFromTrackRow = trackRow.lastChild;

  const { songName, artistName } = getSongInfoFromTrackRow(trackRow);
  const chorusHref = buildChorusHref(songName, artistName);

  const chorusLink = createChorusLink(chorusHref);
  lastDivFromTrackRow.appendChild(chorusLink);
}

// utility functions

function buildChorusHref(songName, artistName) {
  const query = `name="${songName}" artist="${artistName}"`;
  return `https://chorus.fightthe.pw/search?query=${query}`;
}

function createChorusLink(link) {
  const anchor = document.createElement("a");

  anchor.innerText = "CH";
  anchor.target = "_blank";
  anchor.style.fontSize = "0.875rem";
  anchor.className = ".chorus-link";
  anchor.href = link;

  return anchor;
}

function sanitizeSongName(songName) {
  // Match parenthesis or brackets with live or numbers inside
  // Match anything after a hiphen
  const regex = /\s*[([{][^)}\]]*(live|[0-9])[^)}\]]*[)\]}]|-\s*(.*)/gi;

  const result = songName.replace(regex, "").trim();
  return result;
}

// Observer to check if any song row element is added to DOM

function validateBodyMutations(domMutation) {
  const node = domMutation.addedNodes.item(0);
  const isNodeValid =
    typeof node === "object" && node !== null && "getAttribute" in node;

  if (!isNodeValid) {
    return;
  }

  const nodeAttributeRole = node.getAttribute("role");

  if (nodeAttributeRole === "row") {
    addChorusLink(node.querySelector(selectors.trackListRow));
  }

  if (node.querySelector(selectors.currentSongName)) {
    addChorusLinkToCurrentTrack();
  }
}

const target = document.querySelector("body");

const observer = new MutationObserver((mutations) => {
  mutations.forEach(validateBodyMutations);
});

const config = {
  attributes: false,
  childList: true,
  subtree: true,
  characterData: false,
};

observer.observe(target, config);
