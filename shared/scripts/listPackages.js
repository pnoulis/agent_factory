#!/usr/bin/env node

/*
  This script is intended to be executed through a terminal.

  Example:

  node ./registerPlayer.js 1

  The script cannot accept a shebang '#!/usr/bin/env node' which it would allow
  for its execution without the need to prefix it with 'node' because in some
  contexts it breaks importing the script as a module.

 */

import { CreateBackendService } from "../services/backend/CreateBackendService.js";
const bservice = CreateBackendService();
bservice.start().then(() => {
  bservice.booted = true;
});

/**
 * List agent factory packages
 * @returns {Promise} - Array of packages
 */

function listPackages() {
  return bservice.listPackages();
}

listPackages()
  .then((res) =>
    res.result === "OK" ? res.packages : "Failed to list packages",
  )
  .then((res) => console.dir(res, { depth: null }))
  .finally(process.exit);
