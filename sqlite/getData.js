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

// 更新用户数据
module.exports.updateUserData = (keyword, data, callback) => {
  db.run(
    'update user set username = ?, password = ?, nickname = ?, profile_pic = ? where username = ?',
    [data.username, data.password, data.nickname, data.profile_pic, keyword],
    callback
  )
}

// 获得文章分类
module.exports.getCategoryData = (callback) => {
  db.all('select * from category', callback);
}

// 新增文章分类
module.exports.addCategoryData = (data, callback) => {
  db.run(`insert into category (name, abstract) values (?, ?)`, data.name, data.abstract, callback);
}

// 编辑文章分类
module.exports.updateCategoryData = (keyword, data, callback) => {
  db.run('update category set name = ?, abstract = ? where id = ?', keyword, data, callback);
}

// 删除文章分类
module.exports.deleteCategoryData = (keyword, callback) => {
  db.run('delete from category where id = ?', keyword, callback);
}
