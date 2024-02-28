import { createMysqlDbClient } from "./Mysql.js";

async function deleteUserRows() {
  let db;
  try {
    db = await createMysqlDbClient();
    await db.query("DELETE FROM session");
    await db.query("DELETE FROM user_roles");
    await db.query("DELETE FROM users");
  } finally {
    db.end();
  }
}

export { deleteUserRows };
