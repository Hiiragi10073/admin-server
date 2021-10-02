const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const formidable = require('formidable')

const {
  addPostData,
  getCategoryData,
  addCategoryData,
  updateCategoryData,
  deleteCategoryData,
  getPostListData,
  getPostListCount,
  deletePostData,
  updatePostData
} = require('../controller/post')

// 获取文章分类
router.get('/getCategory', (req, res) => {
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
router.post('/updateCategory', (req, res) => {
  if (req.body.id) {
    updateCategoryData(req.body.id, req.body, (err) => {
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
  } else {
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
  }
})

// 删除文章分类
router.get('/deleteCategory/:id', (req, res) => {
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
router.post('/getPostList', (req, res) => {
  let total = 0
  getPostListCount(req.body, (err, data) => {
    if (err) {
      res.json({
        status: 401,
        message: '文章总数获取失败'
      })
      return
    }
    total = data[0]['count(*)']

    getPostListData(req.body, (err, data) => {
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

// 删除文章
router.get('/deletePost/:id', (req, res) => {
  deletePostData(req.params.id, (err) => {
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

// 上传文章封面
router.post('/uploadPostCover', (req, res) => {
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
    const targetDir = path.join(__dirname, '../assets/post')
    const filePath = files.file.path.substring(files.file.path.lastIndexOf('/'))
    const fileName = 'post_cover_' + Date.now() + '.jpg'
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
        filePath: '/post/' + fileName
      })
    })
  })

  form.on('error', (err) => {
    res.json({
      status: 401,
      message: '图片保存失败'
    })
  })
})

// 更新文章
router.post('/updatePost', (req, res) => {
  updatePostData(req.body, (err) => {
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
router.post('/releasePost', (req, res) => {
  addPostData(req.body, (err) => {
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
