import { createMysqlDbClient } from "./Mysql.js";

async function flush() {
  let db;
  try {
    db = await createMysqlDbClient();
    await db.query(
      [
        "SET foreign_key_checks = 0",
        "DELETE FROM roster_player WHERE roster_id > 20",
        "DELETE FROM roster WHERE id > 20",
        "DELETE FROM team where id > 20",
        "UPDATE wristband SET active = 0, wristband_color = NULL",
        "DELETE from player where id > 140",
        "TRUNCATE package",
      ].join(";"),
    );
  } finally {
    await db.query("SET foreign_key_checks = 1");
    db.end();
  }
}

export { flush };
