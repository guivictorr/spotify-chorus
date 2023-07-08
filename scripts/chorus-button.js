function buildChorusIcon() {
  const img = document.createElement("img");
  img.src = chrome.runtime.getURL("./assets/icon.png");
  return img;
}

function buildChorusUrl(songName, artistName) {
  const query = `name="${songName}" artist="${artistName}"`;
  return `https://chorus.fightthe.pw/search?query=${query}`;
}

function handleChorusButton(event) {
  const offsetParent = event.target.offsetParent;
  const { songName, artistName } = getSongInfoFrom(offsetParent);
  const chorusUrl = buildChorusUrl(songName, artistName);

  window.open(chorusUrl, "_blank");
}

function createChorusButton() {
  const button = document.createElement("button");
  const chorusIcon = buildChorusIcon();

  button.appendChild(chorusIcon);
  button.classList.add("chorus-button");

  button.addEventListener("click", handleChorusButton);

  return button;
}
