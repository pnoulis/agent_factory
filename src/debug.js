function debug(any) {
  console.dir(any, { depth: null });
}

globalThis.debug = debug;
