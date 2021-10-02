const db = require('../sqlite/db')

// 登录验证
module.exports.login = (keyword, callback) => {
  db.all(`select * from user where username=?`, keyword, callback)
}

// 获取用户信息
module.exports.getUserData = (keyword, callback) => {
  db.all(`select * from user where username=?`, keyword, callback)
}

// 获取菜单信息
module.exports.getMenuData = (callback) => {
  db.all(`select * from menu`, callback)
}

// 更新用户数据
module.exports.updateUserData = (keyword, data, callback) => {
  db.run(
    'update user set username = ?, password = ?, nickname = ?, profile_pic = ? where username = ?',
    [data.username, data.password, data.nickname, data.profile_pic, keyword],
    callback
  )
}
