const selectors = {
  trackListRow: 'div[data-testid="tracklist-row"]',
  songName: 'div[data-encore-id="type',
  artistName: 'a[href^="/artist/"]',
  artistNameFallback: 'span[data-testid="entityTitle"]',
};

const trackListRow = document.querySelectorAll(selectors.trackListRow);

function createChorusLink() {
  const anchor = document.createElement("a");

  anchor.innerText = "CH";
  anchor.target = "_blank";
  anchor.style.fontSize = "0.875rem";
  anchor.className = ".chorus-trackrow-link";

  return anchor;
}

const chorusLink = createChorusLink();

function addChorusLink(trackRow) {
  const lastDivFromTrackRow = trackRow.lastChild;

  const songName = trackRow.querySelector(selectors.songName)?.innerText;
  const artistName = trackRow.querySelector(selectors.artistName)?.innerText;
  const artistNameFallback = document.querySelector(
    selectors.artistNameFallback
  )?.innerText;

  chorusLink.href = `https://chorus.fightthe.pw/search?query=name="${songName}" artist="${
    artistName ?? artistNameFallback
  }"`;

  lastDivFromTrackRow.appendChild(chorusLink.cloneNode(true));
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
