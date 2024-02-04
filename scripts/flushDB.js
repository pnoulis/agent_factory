#!/usr/bin/env node
import { flush } from "../src/mysqldb/flush.js";

await flush();
console.log("done");
process.exit(0);
