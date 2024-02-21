import { createMysqlDbClient } from "./Mysql.js";

async function stopSession() {
  let db;
  try {
    db = await createMysqlDbClient();
    const [response] = await db.query(
      [
        "UPDATE session SET",
        "updated = now(),",
        "ended = now(),",
        "is_current = 1",
        "WHERE session.is_current = 1;",
      ].join(" "),
    );
    return response.changedRows;
  } finally {
    db.end();
  }
}

export { stopSession };
