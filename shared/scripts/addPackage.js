#!/usr/bin/env node

/*
  This script can be executed from the command line or imported
  as a module in a nodejs runtime only. Browser runtime is not supported.

  In order to call this script from the command line an argument *must*
  be provided. Such a requirement exists in order to allow the script a
  chance at detecting its runtime environment and prevent it from
  running jobs twice if imported as a module.

  Example:

  ./addPackage.js 1
 */

const arg1 = parseInt(process.argv[2]);
const arg2 = process.argv.splice(3);
const { randomPackage } = await import("./randomPackage.js");

import { CreateBackendService } from "../services/backend/CreateBackendService.js";

const bservice = CreateBackendService();

/*
  Assume this module has been executed as a script if the parent node process
  has been provided with command line arguments instead of being used as a
  module through an import.
 */

if (arg1) {
  const { registerTeam } = await import("./registerTeam.js");
  globalThis.registerTeam = registerTeam;
  addPackage(arg1, ...arg2)
    .then((res) => {
      console.log(res);
      process.exit();
    })
    .catch((err) => console.log(err));
} else {
  const { registerTeam } = await import("./registerTeam.js");
  globalThis.registerTeam = registerTeam;
}

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
        teamName = await globalThis
          .registerTeam()
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

      const { result, message } = await bservice.addPackage({
        ...jobs[i],
      });

      if (result === "NOK") {
        throw new Error("Failed team registration", { cause: message });
      }
      console.log(`Successfully added package to team ${i}`);
    } catch (err) {
      console.log(`Failed to add package to team ${i}`);
      throw err;
    }
    i++;
  }

  return jobs.length > 1 ? jobs : jobs.pop();
}

export { addPackage };
