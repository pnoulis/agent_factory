import * as MYSQLDB_CLIENT_LIB from "mysql2/promise";
import { ENVIRONMENT } from "../config.js";

/**
 * Connect to a mysql server
 *
 * @param {string} url - mysql server host
 * @returns {Promise<mysqlClient>} - promise based
 *
 * @example
 * import { mysqlClient } from './mysql.js'
 *
 * const mysqlClientBackend = await mysqlClient(MYSQLDB_LOGIN_BACKEND_URL);
 *
 * await connection.query('SELECT *...')
 *
 **/

function getMysqlClient(url = "", options = {}) {
  options = {
    multipleStatements: true,
    ...options,
  };
  let urlparams = "";
  let connstr = url;

  for (const [k, v] of Object.entries(options)) {
    urlparams += `${k}=${v}&`;
  }

  if (urlparams) {
    connstr += `?${urlparams.slice(0, -1)}`;
  }

  return MYSQLDB_CLIENT_LIB.createConnection(connstr);
}

const getMysqlClientBackend = getMysqlClient.bind(
  null,
  ENVIRONMENT.MYSQLDB_LOGIN_BACKEND_URL
);

export { getMysqlClient, getMysqlClientBackend };
