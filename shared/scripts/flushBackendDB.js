/*
  This script can be executed from the command line or imported
  as a module in a nodejs runtime only. Browser runtime is not supported.

  In order to call this script from the command line an argument *must*
  be provided. Such a requirement exists in order to allow the script a
  chance at detecting its runtime environment and prevent it from
  running jobs twice if imported as a module.

  Example:

  node ./flushBackendDB.js 1

  The script cannot accept a shebang '#!/usr/bin/env node' which it would allow
  for its execution without the need to prefix it with 'node' because in some
  contexts it breaks importing the script as a module.

 */

import process from "node:process";
import { getMysqlClientBackend } from "../clients/mysql.js";
const mysqlClientBackend = await getMysqlClientBackend({
  multipleStatements: true,
});

/*
  ------------------------------ CLI ------------------------------
  Assume this module has been executed as a script if the parent node process
  has been provided with command line arguments instead of being used as a
  module through an import.

  The command line arguments if any; are consumed by this script before
  importing other scripts which read process.argv to determine their calling
  context.
*/
if (process.argv.length > 2) {
  process.argv.splice(2);
  flushBackendDB().finally(process.exit);
}

/* ------------------------------ MODULE ------------------------------ */
function flushBackendDB() {
  const sql = [
    "SET foreign_key_checks = 0",
    "TRUNCATE roster_player",
    "TRUNCATE team",
    "UPDATE wristband set active = 0 where active = 1",
    "TRUNCATE player",
    "TRUNCATE package",
    "SET foreign_key_checks = 1",
  ];
  return mysqlClientBackend
    .query(sql.join(";"))
    .then((res) => {
      console.log("Successfull backend mysqldb flush!");
    })
    .catch((err) => {
      console.log(err);
      console.log("Failed backend mysqldb flush!");
      throw err;
    });
}

export { flushBackendDB };
