const express = require('express')
const router = express.Router()

const { getBlogList, getBlogPost, addBlogPost } = require('../controller/blog')

// 获取博客列表
router.get('/list', (req, res) => {
  getBlogList(req.query.category, (err, data) => {
    if (err) {
      res.json({
        status: 401,
        message: '获取列表失败'
      })
      return
    }
    res.json({
      status: 200,
      message: '数据获得成功',
      data: data
    })
  })
})

// 获取博客内容
router.get('/post', (req, res) => {
  getBlogPost(req.query.id, (err, data) => {
    if (err) {
      res.json({
        status: 401,
        message: '获取列表失败'
      })
      return
    }
    res.json({
      status: 200,
      message: '数据获得成功',
      data: data[0]
    })
  })
})

// 上传博客
router.post('/post', (req, res) => {
  addBlogPost(req.body, (err) => {
    if (err) {
      res.json({
        err: err,
        status: 401,
        message: '发布博客失败，请检查参数'
      })
      return
    }
    res.json({
      status: 200,
      message: '博客发布成功'
    })
  })
})

module.exports = router
