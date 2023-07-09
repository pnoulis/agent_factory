#!/usr/bin/env node

/*
  This script can be executed from the command line or imported
  as a module in a nodejs runtime only. Browser runtime is not supported.

  In order to call this script from the command line an argument *must*
  be provided. Such a requirement exists in order to allow the script a
  chance at detecting its runtime environment and prevent it from
  running jobs twice if imported as a module.

  Example:

  ./flushBackendDB.js 1

 */

import process from "node:process";
import { ENVIRONMENT } from "../config.js";
import { mysqlClient } from "../clients/mysql.js";

const mysqlClientBackend = await mysqlClient(
  ENVIRONMENT.MYSQLDB_LOGIN_BACKEND_URL,
  {
    multipleStatements: true,
  },
);

/*
  Assume this module has been executed as a script if the parent node process
  has been provided with command line arguments instead of being used as a
  module through an import.
 */

if (process.argv.length > 2) {
  flushBackendDB()
    .then((res) => {
      process.exit();
    })
    .catch((err) => console.log(err));
}

function flushBackendDB() {
  const sql = [
    "SET foreign_key_checks = 0",
    "TRUNCATE roster_player",
    "TRUNCATE team",
    "UPDATE wristband set active = 0 where active = 1",
    "TRUNCATE player",
    "TRUNCATE package",
  ];
  return mysqlClientBackend
    .query(sql.join(";"))
    .then((res) => {
      console.log("Successfull backend mysqldb flush!");
    })
    .catch((err) => {
      console.log("Failed backend mysqldb flush!");
      throw err;
    });
}

export { flushBackendDB };
