const db = require('../sqlite/db')

// 获得文章分类
module.exports.getCategoryData = (callback) => {
  db.all('select * from category', callback)
}

// 新增文章分类
module.exports.addCategoryData = (data, callback) => {
  db.run(
    `insert into category (name, abstract) values (?, ?)`,
    data.name,
    data.abstract,
    callback
  )
}

// 编辑文章分类
module.exports.updateCategoryData = (keyword, data, callback) => {
  db.run(
    'update category set name = ?, abstract = ? where id = ?',
    keyword,
    data,
    callback
  )
}

// 删除文章分类
module.exports.deleteCategoryData = (keyword, callback) => {
  db.run('delete from category where id = ?', keyword, callback)
}

// 获取文章列表
module.exports.getPostListData = (config, callback) => {
  if (config.keyword || config.category_id !== 0) {
    if (config.category_id !== 0) {
      db.all(
        'select * from post where category_id = ? and content like ? limit ? offset ? ',
        config.category_id,
        '%' + config.keyword + '%',
        config.limit,
        config.offset,
        callback
      )
    } else {
      db.all(
        'select * from post where content like ? limit ? offset ? ',
        '%' + config.keyword + '%',
        config.limit,
        config.offset,
        callback
      )
    }
  } else {
    db.all(
      'select * from post limit ? offset ?',
      config.limit,
      config.offset,
      callback
    )
  }
}

// 获取文章总数
module.exports.getPostListCount = (config, callback) => {
  if (config.keyword || config.category_id !== 0) {
    if (config.category_id !== 0) {
      db.all(
        'select count(*) from post where category_id = ? and content like ?',
        config.category_id,
        '%' + config.keyword + '%',
        callback
      )
    } else {
      db.all(
        'select count(*) from post where content like ?',
        '%' + config.keyword + '%',
        callback
      )
    }
  } else {
    db.all('select count(*) from post', callback)
  }
}

// 删除文章
module.exports.deletePostData = (keyword, callback) => {
  db.run('delete from post where id =?', keyword, callback)
}

// 更新文章
module.exports.updatePostData = (data, callback) => {
  db.run(
    'update post set title = ?, category_id = ?, cover = ?, content = ? where id = ?',
    data.title,
    data.category_id,
    data.cover,
    data.content,
    data.id,
    callback
  )
}

// 发布文章
module.exports.addPostData = (data, callback) => {
  db.run(
    'insert into post (title, content, cover, star, unlike, category_id) values (?, ?, ?, ?, ?, ?)',
    data.title,
    data.content,
    data.cover,
    0,
    0,
    data.category_id,
    callback
  )
}
