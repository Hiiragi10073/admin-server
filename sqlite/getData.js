const sqlite3 = require('sqlite3').verbose();
const path = require('path');

let sqliteDbPath = path.join(__dirname, 'admin.db');

let db = new sqlite3.Database(sqliteDbPath);

// 登录验证
module.exports.login = (keyword, callback) => {
  db.all(`select * from user where username=?`, keyword, callback);
};

// 获取用户信息
module.exports.getUserData = (keyword, callback) => {
  db.all(`select * from user where username=?`, keyword, callback);
};

// 获取菜单信息
module.exports.getMenuData = (callback) => {
  db.all(`select * from menu`, callback);
}

module.exports.updateUserData = (keyword, data, callback) => {
  db.run(
    'UPDATE user SET username = ?, password = ?, nickname = ?, profile_pic = ? WHERE username = ?',
    [data.username, data.password, data.nickname, data.profile_pic, keyword],
    callback
  )
}