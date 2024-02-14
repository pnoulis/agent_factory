import langs from "../languages.json" with { type: "json" };

function translate(lang, key) {
  return langs[key]?.[lang] || langs[key]?.["en-US"] || key;
}

export { translate };
