import { createMysqlDbClient } from "./Mysql.js";

async function getSession() {
  let db;
  try {
    db = await createMysqlDbClient();
    const [response] = await db.query(
      [
        "SELECT * FROM session",
        "RIGHT JOIN users ON",
        "session.user_id = users.id",
        "WHERE session.is_current = 1;",
      ].join(" "),
    );

    // no session
    if (!response.length) return null;
    const session = response.pop();
    return {
      id: session.user_id,
      email: session.email,
      username: session.username,
      created: session.created,
      ended: session.ended,
    };
  } finally {
    db.end();
  }
}

export { getSession };
