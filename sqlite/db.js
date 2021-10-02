const sqlite3 = require('sqlite3').verbose()
let sqliteDbPath = process.env.DB_PATH
const db = new sqlite3.Database(sqliteDbPath)

module.exports = db
