import mysql from "mysql2/promise";
import { ENV } from "../config.js";

function createMysqlDbClient(url = "", options = {}) {
  const _options = {
    multipleStatements: true,
    ...options,
  };
  let urlparams = "";
  let connectionString = url || ENV.AFADMIN_MYSQLDB_URL;
  if (connectionString === "") {
    throw new Error("Missing mysqldb client connection string");
  }
  for (const [k, v] of Object.entries(_options)) {
    urlparams += `${k}=${v}&`;
  }

  if (urlparams) {
    connectionString += `?${urlparams.slice(0, -1)}`;
  }

  return mysql.createConnection(connectionString);
}

export { createMysqlDbClient };
