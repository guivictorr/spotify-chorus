const target = document.querySelector("body");

function validateBodyMutations(domMutation) {
  const node = domMutation.addedNodes.item(0);
  const isNodeValid =
    typeof node === "object" && node !== null && "getAttribute" in node;

  if (!isNodeValid) {
    return;
  }

  const nodeAttributeRole = node.getAttribute("role");

  if (nodeAttributeRole === "row") {
    addChorusLink(node.querySelector(trackRowSelectors.trackListRow));
  }

  const songName = node.querySelector(currentTrackSelectors.currentSongName);

  if (songName) {
    addChorusLinkToCurrentTrack();
  }
}

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
