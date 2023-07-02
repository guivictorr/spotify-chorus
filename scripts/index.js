const selectors = {
  trackListRow: 'div[data-testid="tracklist-row"]',
  songName: 'div[data-encore-id="type',
  artistName: 'a[href^="/artist/"]',
  artistNameFallback: 'span[data-testid="entityTitle"]',
};

const trackListRow = document.querySelectorAll(selectors.trackListRow);

function createChorusLink(songName, artistName) {
  const anchor = document.createElement("a");
  const query = `name="${songName}" artist="${artistName}"`;

  anchor.innerText = "CH";
  anchor.target = "_blank";
  anchor.style.fontSize = "0.875rem";
  anchor.className = ".chorus-trackrow-link";
  anchor.href = `https://chorus.fightthe.pw/search?query=${query}`;

  return anchor;
}

function sanitizeSongName(songName) {
  // Match parenthesis or brackets with live or numbers inside
  // Match anything after a hiphen
  const regex = /\s*[([{][^)}\]]*(live|[0-9])[^)}\]]*[)\]}]|-\s*(.*)/gi;

  const result = songName.replace(regex, "").trim();
  return result;
}

function getSongInfoFromTrackRow(trackRow) {
  const songName = trackRow.querySelector(selectors.songName)?.innerText;
  const sanitizedSongName = sanitizeSongName(songName);

  const artistName = trackRow.querySelector(selectors.artistName)?.innerText;
  const artistNameFallback = document.querySelector(
    selectors.artistNameFallback
  )?.innerText;

  return {
    songName: sanitizedSongName,
    artistName: artistName ?? artistNameFallback,
  };
}

function addChorusLink(trackRow) {
  const lastDivFromTrackRow = trackRow.lastChild;

  const { songName, artistName } = getSongInfoFromTrackRow(trackRow);

  const chorusLink = createChorusLink(songName, artistName);
  lastDivFromTrackRow.appendChild(chorusLink);
}

// Observer to check if any song row element is added to DOM

function checkIfSongRowIsAdded(domMutation) {
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
}

const target = document.querySelector("body");

const observer = new MutationObserver((mutations) => {
  mutations.forEach(checkIfSongRowIsAdded);
});

const config = {
  attributes: false,
  childList: true,
  subtree: true,
  characterData: false,
};

observer.observe(target, config);
