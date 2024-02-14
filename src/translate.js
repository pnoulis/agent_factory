import langs from "../languages.json" with { type: "json" };

function translate(lang, key) {
  if (key === 'register player') {
    debug(langs[key], 'register player');
  }
  return langs[key]?.[lang] || langs[key]?.["en-US"] || key;
}

export { translate };
