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
  anchor.style.display = "flex";
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

trackListRow.forEach(addChorusLink);

// Observe if any tracklist-row is added to DOM

const target = document.querySelector("body");

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    const node = mutation.addedNodes.item(0);

    if (node && node.querySelector(selectors.trackListRow)) {
      addChorusLink(node.querySelector(selectors.trackListRow));
    }
  });
});

const config = {
  attributes: false,
  childList: true,
  subtree: true,
  characterData: false,
};

observer.observe(target, config);
