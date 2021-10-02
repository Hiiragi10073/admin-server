const db = require('../sqlite/db')

// 获取博客列表
module.exports.getBlogList = (category, callback) => {
  db.run('select * from blog where category = ?', category, callback)
}

// 上传博客
module.exports.addBlogPost = (data, callback) => {
  db.run(
    'insert into blog (title, url, category) values (?, ?, ?)',
    data.title,
    data.url,
    data.url,
    data.category,
    callback
  )
}

// 获取博客内容
module.exports.getBlogPost = (id, callback) => {
  db.run('select * from blog where id = ?', id, callback)
}
