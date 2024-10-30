import sqlite from "sqlite3";

const db = new sqlite.Database("./server/databases/users.db");

db.serialize(() => {});

export default db;
