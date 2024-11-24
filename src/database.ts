import { Pool } from "pg";
const { db } = require("./config");

const pool = new Pool({
  user: db.user,
  password: db.password,
  host: db.host,
  port: db.db_port,
  database: db.database
});

module.exports = pool;