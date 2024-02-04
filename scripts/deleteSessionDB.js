#!/usr/bin/env node
import { deleteActiveSessionRow } from "../src/mysqldb/deleteActiveSessionRow.js";

const { noSession, id, username, email } = await deleteActiveSessionRow();
if (noSession) {
  console.log("No active session row");
} else {
  console.log("DELETED ACTIVE SESSION ROW");
  console.log("id: ", id);
  console.log("username: ", username);
  console.log("email: ", email);
}
