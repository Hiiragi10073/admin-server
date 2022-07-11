const db = require('../sqlite/db');
const { isDef, isUndef } = require('../utils/type');
// 获得文章分类
module.exports.getCategoryData = callback => {
  db.all('select * from blogCategory', callback);
};

// 新增文章分类
module.exports.addCategoryData = (data, callback) => {
  db.run(
    `insert into blogCategory (code, category, desc) values (?, ?, ?)`,
    data.code,
    data.category,
    data.desc,
    callback
  );
};

// 编辑文章分类
module.exports.updateCategoryData = (data, callback) => {
  db.run(
    'update blogCategory set code = ?, category = ?, desc = ? where id = ?',
    data.code,
    data.category,
    data.desc,
    data.id,
    callback
  );
};

// 删除文章分类
module.exports.deleteCategoryData = (keyword, callback) => {
  db.run('delete from blogCategory where id = ?', keyword, callback);
};

// 获取文章列表
module.exports.getBlogListData = (config, callback) => {
  const params = [];
  const { keyword, categoryId, limit, offset } = config;
  let sqlStr = 'select * from blog';

  isDef(keyword) &&
    params.push({ str: 'content like ?', value: `%${keyword}%` });
  isDef(categoryId) &&
    params.push({ str: 'categoryId = ?', value: categoryId });
  params.push({ str: 'limit ?', value: isDef(limit) ? limit : 10 });
  params.push({ str: 'offset ?', value: isDef(offset) ? offset : 0 });

  if (isDef(keyword) || isDef(categoryId)) {
    sqlStr += ' where';
  }

  params.forEach(i => {
    sqlStr += ` ${i.str}`;
  });

  db.all(sqlStr, ...params.map(i => i.value), callback);
};

// 获取文章总数
module.exports.getBlogListCount = (config, callback) => {
  const params = [];
  let sqlStr = 'select count(*) from blog';
  const { keyword, categoryId } = config;

  keyword && params.push({ str: 'content like ?', value: `%${keyword}%` });
  categoryId && params.push({ str: 'categoryId = ?', value: categoryId });

  if (params.length > 0) {
    sqlStr += ' where';

    params.forEach(i => {
      sqlStr += ` ${i.str}`;
    });
  }

  db.all(sqlStr, ...params.map(i => i.value), callback);
};

// 根据id获取博客
module.exports.getBlogById = (id, callback) => {
  db.all('select * from blog where id = ?', id, callback);
};

// 删除文章
module.exports.deleteBlogData = (id, callback) => {
  db.run('delete from blog where id =?', id, callback);
};

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
  );
};

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
  );
};
