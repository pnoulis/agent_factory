import { createMysqlDbClient } from "./Mysql.js";

async function deleteActiveSessionRow() {
  let db;
  try {
    db = await createMysqlDbClient();
    const [response] = await db.query(
      "SELECT * from session JOIN users on users.id = session.user_id WHERE session.is_current = true",
    );

    if (response.length === 0) return { noSession: true };
    await db.query("DELETE FROM session WHERE is_current = true");
    const { user_id: id, username, email } = response.pop();
    return { id, username, email };
  } finally {
    db.end();
  }
}

export { deleteActiveSessionRow };
