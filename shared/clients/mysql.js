import * as MYSQLDB_CLIENT_LIB from "mysql2";

function mysqlClient(url) {
  return MYSQLDB_CLIENT_LIB.createConnection(url);
}

export { mysqlClient };
