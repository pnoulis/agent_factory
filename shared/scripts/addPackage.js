/*
  This script can be executed from the command line or imported
  as a module in a nodejs runtime only. Browser runtime is not supported.

  In order to call this script from the command line an argument *must*
  be provided. Such a requirement exists in order to allow the script a
  chance at detecting its runtime environment and prevent it from
  running jobs twice if imported as a module.

  Example:

  node ./addPackage.js 1

  The script cannot accept a shebang '#!/usr/bin/env node' which would allow for
  its execution without the need to prefix it with 'node' because in some
  contexts it breaks importing the script as a module.
 */

import { CreateBackendService } from "../services/backend/CreateBackendService.js";
const bservice = CreateBackendService();
bservice.start().then(() => {
  bservice.booted = true;
})

/*
  ------------------------------ CLI ------------------------------
  Assume this module has been executed as a script if the parent node process
  has been provided with command line arguments instead of being used as a
  module through an import.

  The command line arguments if any; are consumed by this script before
  importing other scripts which read process.argv to determine their calling
  context.
*/
let arg1, arg2;
if (globalThis.process.argv.length > 2) {
  arg1 = parseInt(process.argv.splice(2, 1));
  arg2 = process.argv.splice(2);
}
const { randomPackage } = await import("./randomPackage.js");
const { registerTeam } = await import("./registerTeam.js");
if (arg1) {
  addPackage(arg1, ...arg2).then((res) => {
    console.dir(res, { depth: null})
  }).finally(process.exit);
}

/* ------------------------------ MODULE ------------------------------ */
async function addPackage(packages, ...mergedTeams) {
  let i = 0;
  let jobs = null;
  if (typeof packages === "number") {
    jobs = new Array(packages).fill(null).map((_) => ({}));
    packages = [];
  } else if (packages instanceof Array) {
    if (typeof packages[0] === "number") {
      jobs = new Array(packages[0]).fill(null).map((_) => ({}));
    } else {
      jobs = new Array(
        packages.length > mergedTeams.length
          ? packages.length
          : mergedTeams.length,
      )
        .fill(null)
        .map((_) => ({}));
    }
  } else {
    jobs = new Array(mergedTeams.length || 1).fill(null).map((_) => ({}));
    packages = [];
  }

  while (i < jobs.length) {
    try {
      let teamName = mergedTeams.pop();
      if (!teamName) {
        teamName = await registerTeam()
          .then((team) => team.teamName);
      } else if (typeof teamName === "object") {
        teamName = teamName.teamName;
      }

      let pkg = packages.pop() || randomPackage();
      if (typeof pkg === "object") {
        pkg = pkg.name;
      }
      Object.assign(jobs[i], {
        teamName,
        name: pkg,
      });

      const { result, message, team } = await bservice.addPackage({
        ...jobs[i],
      });

      if (result === "NOK") {
        throw new Error("Failed team registration", { cause: message });
      }
      console.log(`Successfully added package to team ${i}`);
      jobs[i] = team;
    } catch (err) {
      console.log(err);
      console.log(`Failed to add package to team ${i}`);
      throw err;
    }
    i++;
  }

  return jobs.length > 1 ? jobs : jobs.pop();
}

export { addPackage };
