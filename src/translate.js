import langs from "../languages.json" with { type: "json" };

function translate(lang, key) {
  const lkey = "".concat(key).toLowerCase();
  if (!langs[lkey]) {
    const trans = JSON.parse(window.localStorage.getItem("trans")) || {};
    trans[lkey] = "";
    window.localStorage.setItem("trans", JSON.stringify(trans));
  }
  return langs[lkey]?.[lang] || langs[lkey]?.["en-US"] || key;
}

export { translate };
