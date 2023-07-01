const tracklist = document.querySelectorAll('div[data-testid="tracklist-row"]');

function createChorusLink() {
  const anchor = document.createElement("a");

  anchor.innerText = "CH";
  anchor.target = "_blank";
  anchor.style.fontSize = "0.875rem";
  anchor.style.display = "flex";
  anchor.className = "chorus-extension-link";

  return anchor;
}

const chorusLink = createChorusLink();

function addChorusLink(track) {
  const lastDivFromTrackRow = track.lastChild;
  const chorusExist = lastDivFromTrackRow.querySelector(
    ".chorus-extension-link"
  );

  if (chorusExist) return;

  const songName = track.querySelector('div[data-encore-id="type"').innerText;
  const artistNameFallback = document.querySelector(
    'span[data-testid="entityTitle"]'
  ).innerText;
  const artistName = track.querySelector('a[href^="/artist/"]')?.innerText;
  chorusLink.href = `https://chorus.fightthe.pw/search?query=name="${songName}" artist="${
    artistName ?? artistNameFallback
  }"`;
  lastDivFromTrackRow.appendChild(chorusLink.cloneNode(true));
}

tracklist.forEach(addChorusLink);

// Observe if any tracklist-row is added to DOM

const target = document.querySelector("body");

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    const node = mutation.addedNodes.item(0);

    if (node && node.querySelector('div[data-testid="tracklist-row"]')) {
      addChorusLink(node.querySelector('div[data-testid="tracklist-row"]'));
    }
  });
});

var config = {
  attributes: false,
  childList: true,
  subtree: true,
  characterData: false,
};

observer.observe(target, config);
