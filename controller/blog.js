const db = require('../sqlite/db')

// 获取博客列表
module.exports.getBlogList = (category, callback) => {
  db.all('select * from blog', callback)
}

// 上传博客
module.exports.addBlogPost = (data, callback) => {
  db.run(
    'insert into blog (title, content, category) values (?, ?, ?)',
    data.title,
    data.content,
    data.category,
    callback
  )
}

// 获取博客内容
module.exports.getBlogPost = (id, callback) => {
  db.all('select * from blog where id = ?', id, callback)
}
