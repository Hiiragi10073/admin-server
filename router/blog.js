const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const formidable = require('formidable')

const { getBlogList, getBlogPost, addBlogPost } = require('../controller/blog')

// 获取博客列表
router.get('/list', (req, res) => {
  getBlogList(req.params.category, (err, data) => {
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
  getBlogPost(req.params.id, (err, data) => {
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

// 上传博客html
router.post('/html', (req, res) => {
  const form = new formidable.IncomingForm()
  form.uploadDir = path.join(__dirname, 'temp')
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.json({
        status: 401,
        message: '图片上传失败'
      })
      return
    }
    const targetDir = path.join(__dirname, '../assets/postHtml')
    const filePath = files.fileName.path.substring(
      files.fileName.path.lastIndexOf('/')
    )
    const fileName = 'postHtml_' + Date.now() + '.html'
    const targetFile = path.join(targetDir, fileName)

    fs.rename(filePath, targetFile, (err) => {
      if (err) {
        res.json({
          status: 401,
          message: '图片保存失败'
        })
        return
      }
      res.json({
        status: 200,
        message: '图片保存成功',
        filePath: '/postHtml/' + fileName
      })
    })
  })
})

// 上传博客
router.post('/post', (req, res) => {
  addBlogPost(req.body, (err) => {
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
