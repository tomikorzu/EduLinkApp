import sqlite from "sqlite3";

const db = new sqlite.Database("./server/databases/users.db");

db.run(`CREATE TABLE IF NOT EXISTS users(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  fullname TEXT NOT NULL,
  role TEXT NOT NULL
)`);

db.run("PRAGMA busy_timeout = 5000;");
db.run("PRAGMA journal_mode=WAL;");

export default db;
