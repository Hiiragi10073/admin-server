const sqlite3 = require('sqlite3').verbose()

let sqliteDbPath = process.env.DB_PATH

module.exports.db = new sqlite3.Database(sqliteDbPath)
