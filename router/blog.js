const express = require('express')
const router = express.Router()

const {
  addBlogData,
  getCategoryData,
  addCategoryData,
  updateCategoryData,
  deleteCategoryData,
  getBlogListData,
  getBlogListCount,
  getBlogById,
  deleteBlogData,
  updateBlogData
} = require('../controller/blog')

// 获取文章分类
router.get('/category', (req, res) => {
  getCategoryData((err, data) => {
    if (err) {
      throw err
    } else {
      res.json({
        status: 200,
        message: '获取分类成功',
        data
      })
    }
  })
})

// 新增文章分类
router.post('/category', (req, res) => {
  addCategoryData(req.body, (err) => {
    if (err) {
      res.json({
        status: 401,
        message: '新增分类失败，请检查属性'
      })
      return
    }
    res.json({
      status: 200,
      message: '新增分类成功'
    })
  })
})

// 编辑文章分类
router.put('/category', (req, res) => {
  updateCategoryData(req.body, (err) => {
    if (err) {
      res.json({
        status: 401,
        message: '编辑分类失败，请检查属性'
      })
      return
    }
    res.json({
      status: 200,
      message: '编辑分类成功'
    })
  })
})

// 删除文章分类
router.delete('/category/:id', (req, res) => {
  deleteCategoryData(req.params.id, (err) => {
    if (err) {
      res.json({
        status: 401,
        message: '删除分类失败，请检查属性'
      })
      return
    }
    res.json({
      status: 200,
      message: '删除分类成功'
    })
  })
})

// 获取文章列表
router.get('/list', (req, res) => {
  let total = 0
  getBlogListCount(req.query, (err, data) => {
    if (err) {
      res.json({
        status: 401,
        message: '文章总数获取失败'
      })
      return
    }
    total = data[0]['count(*)']

    getBlogListData(req.query, (err, data) => {
      if (err) {
        res.json({
          status: 401,
          message: '文章列表获取失败'
        })
        return
      }
      res.json({
        status: 200,
        message: '文章获取成功',
        data,
        total
      })
    })
  })
})

// 根据id获取文章
router.get('/:id', (req, res) => {
  getBlogById(req.params.id, (err, data) => {
    if (err) {
      res.json({
        status: 401,
        message: '获取博客失败，请检查参数'
      })
      return;
    }
    res.json({
      status: 200,
      message: '博客获取成功',
      data: data[0]
    })
  })
})

// 删除文章
router.delete('/:id', (req, res) => {
  deleteBlogData(req.params.id, (err) => {
    if (err) {
      res.json({
        status: 401,
        message: '删除文章失败，请检查参数'
      })
      return
    }
    res.json({
      status: 200,
      message: '文章删除成功'
    })
  })
})

// 更新文章
router.put('/', (req, res) => {
  updateBlogData(req.body, (err) => {
    if (err) {
      res.json({
        status: 401,
        message: '编辑文章失败，请检查参数'
      })
      return
    }
    res.json({
      status: 200,
      message: '文章编辑成功'
    })
  })
})

// 发布文章
router.post('/', (req, res) => {
  addBlogData(req.body, (err) => {
    if (err) {
      res.json({
        status: 401,
        message: '发布文章失败，请检查参数'
      })
      return
    }
    res.json({
      status: 200,
      message: '文章发布成功'
    })
  })
})

module.exports = router
