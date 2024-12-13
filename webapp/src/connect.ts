
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
    "./collection.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the SQlite database.");
  }
);

db.run(
  `CREATE TABLE IF NOT EXISTS data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT,
        name TEXT,
        sysadmin BOOLEAN,
        token TEXT,
        refresh_token TEXT,
        expires_in INTEGER
    )`,
  [],
  (err) => {
    if (err) {
      console.error("Failed to create table:", err);
      return;
    }
    console.log("Table created data successfully.");
    //   Close the database connection
    db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log("Closed the database connection.");
      });

  }
);