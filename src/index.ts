import { createChorusButton, handleChorusButton } from './chorus-button';

function addChorusButtonTo(node: Element, clickEvent: (e: MouseEvent) => void) {
  const chorusButton = node.querySelector('.chorus-button');
  if (!chorusButton) {
    const chorusLink = createChorusButton(clickEvent);
    node.appendChild(chorusLink);
  }
}

function validateBodyMutations(domMutation: MutationRecord) {
  const addedNode = getFirstValidAddedNode(domMutation);

  if (!addedNode) {
    return;
  }

  const trackListRow = addedNode.querySelector(
    'div[data-testid="tracklist-row"]',
  );
  const nowPlayingWidget = document.querySelector(
    '[data-testid="now-playing-widget"]',
  );

  if (trackListRow) {
    addChorusButtonTo(trackListRow.lastElementChild!, handleChorusButton);
  }

  if (nowPlayingWidget) {
    addChorusButtonTo(nowPlayingWidget, handleChorusButton);
  }
}

function getFirstValidAddedNode(domMutation: MutationRecord) {
  const addedNode = domMutation.addedNodes.item(0) as Element;

  if (isValidElement(addedNode)) {
    return addedNode;
  }

  return null;
}

function isValidElement(element: Element | null): boolean {
  return element instanceof Element && element.getAttribute !== undefined;
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
