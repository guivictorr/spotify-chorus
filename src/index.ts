import { createChorusButton } from './chorus-button';

function addChorusButtonTo(node: Element) {
  const chorusButton = node.querySelector('.chorus-button');
  if (!chorusButton) {
    const chorusLink = createChorusButton();
    node.appendChild(chorusLink);
  }
}

function validateBodyMutations(domMutation: MutationRecord) {
  const addedNode = domMutation.addedNodes.item(0) as Element;
  const isNodeValid =
    typeof addedNode === 'object' &&
    addedNode !== null &&
    'getAttribute' in addedNode;

  if (!isNodeValid) {
    return;
  }

  const trackListRow = addedNode.querySelector(
    'div[data-testid="tracklist-row"]',
  );

  if (trackListRow !== null) {
    addChorusButtonTo(trackListRow.lastElementChild!);
  }

  const nowPlayingWidget = document.querySelector(
    '[data-testid="now-playing-widget"]',
  );

  if (nowPlayingWidget) {
    addChorusButtonTo(nowPlayingWidget);
  }
}

const observer = new MutationObserver(mutations => {
  mutations.forEach(validateBodyMutations);
});

const config = {
  attributes: false,
  childList: true,
  subtree: true,
  characterData: false,
};

const target = document.querySelector('body')!;

observer.observe(target, config);
