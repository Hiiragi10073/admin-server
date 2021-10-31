const db = require('../sqlite/db')

// 获得文章分类
module.exports.getCategoryData = (callback) => {
  db.all('select * from blogCategory', callback)
}

// 新增文章分类
module.exports.addCategoryData = (data, callback) => {
  db.run(
    `insert into blogCategory (code, category, desc) values (?, ?, ?)`,
    data.code,
    data.category,
    data.desc,
    callback
  )
}

// 编辑文章分类
module.exports.updateCategoryData = (data, callback) => {
  db.run(
    'update blogCategory set code = ?, category = ?, desc = ? where id = ?',
    data.code,
    data.category,
    data.desc,
    data.id,
    callback
  )
}

// 删除文章分类
module.exports.deleteCategoryData = (keyword, callback) => {
  db.run('delete from blogCategory where id = ?', keyword, callback)
}

// 获取文章列表
module.exports.getBlogListData = (config, callback) => {
  if (config.keyword || config.categoryId != 0) {
    if (config.categoryId != 0) {
      db.all(
        'select * from blog where categoryId = ? and content like ? limit ? offset ? ',
        config.categoryId,
        '%' + config.keyword + '%',
        config.limit,
        config.offset,
        callback
      )
    } else {
      db.all(
        'select * from blog where content like ? limit ? offset ? ',
        '%' + config.keyword + '%',
        config.limit,
        config.offset,
        callback
      )
    }
  } else {
    db.all(
      'select * from blog limit ? offset ?',
      config.limit,
      config.offset,
      callback
    )
  }
}

// 获取文章总数
module.exports.getBlogListCount = (config, callback) => {
  if (config.keyword || config.categoryId !== 0) {
    if (config.categoryId !== 0) {
      db.all(
        'select count(*) from blog where categoryId = ? and content like ?',
        config.categoryId,
        '%' + config.keyword + '%',
        callback
      )
    } else {
      db.all(
        'select count(*) from blog where content like ?',
        '%' + config.keyword + '%',
        callback
      )
    }
  } else {
    db.all('select count(*) from blog', callback)
  }
}

// 根据id获取博客
module.exports.getBlogById = (id, callback) => {
  db.all(
    'select * from blog where id = ?',
    id,
    callback
  )
}

// 删除文章
module.exports.deleteBlogData = (id, callback) => {
  db.run('delete from blog where id =?', id, callback)
}

// 更新文章
module.exports.updateBlogData = (data, callback) => {
  db.run(
    'update blog set title = ?, categoryId = ?,  content = ?, cover = ?, desc = ?, updateTime = ? where id = ?',
    data.title,
    data.categoryId,
    data.content,
    data.cover,
    data.desc,
    Date.now(),
    data.id,
    callback
  )
}

// 发布文章
module.exports.addBlogData = (data, callback) => {
  db.run(
    'insert into blog (title, content, cover, desc, createTime, updateTime, categoryId) values (?, ?, ?, ?, ?, ?, ?)',
    data.title,
    data.content,
    data.cover,
    data.desc,
    Date.now(),
    Date.now(),
    data.categoryId,
    callback
  )
}
