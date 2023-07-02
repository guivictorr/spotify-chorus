function buildChorusHref(songName, artistName) {
  const query = `name="${songName}" artist="${artistName}"`;
  return `https://chorus.fightthe.pw/search?query=${query}`;
}

function sanitizeSongName(songName) {
  // Match parenthesis or brackets with live or numbers inside
  // Match anything after a hiphen
  const regex = /\s*[([{][^)}\]]*(live|[0-9])[^)}\]]*[)\]}]|-\s*(.*)/gi;

  const result = songName.replace(regex, "").trim();
  return result;
}

function createChorusLink(href) {
  const anchor = document.createElement("a");

  anchor.innerText = "CH";
  anchor.target = "_blank";
  anchor.style.fontSize = "0.875rem";
  anchor.className = ".chorus-link";
  anchor.href = href;

  return anchor;
}
