import sqlite from "sqlite3";

const db = new sqlite.Database("./server/databases/users.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE, 
            password TEXT NOT NULL,
            fullname TEXT NOT NULL
        )`);
});

export default db;
