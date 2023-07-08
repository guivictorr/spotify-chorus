const target = document.querySelector("body");

function addChorusButtonTo(node) {
  const chorusButton = node.querySelector(".chorus-button");

  if (!chorusButton) {
    const chorusLink = createChorusButton();
    node.appendChild(chorusLink);
  }
}

function validateBodyMutations(domMutation) {
  const addedNode = domMutation.addedNodes.item(0);
  const isNodeValid =
    typeof addedNode === "object" &&
    addedNode !== null &&
    "getAttribute" in addedNode;

  if (!isNodeValid) {
    return;
  }

  const trackListRow = addedNode.querySelector(
    'div[data-testid="tracklist-row"]'
  );

  if (trackListRow) {
    addChorusButtonTo(trackListRow.lastChild);
  }

  const nowPlayingWidget = document.querySelector(
    '[data-testid="now-playing-widget"]'
  );

  if (nowPlayingWidget) {
    addChorusButtonTo(nowPlayingWidget);
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
