const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const formidable = require('formidable')

// 文件
router.post('/upload', (req, res) => {
  const form = new formidable.IncomingForm()
  form.uploadDir = process.env.TEMP_PATH
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
    const filePath = files.fileName[path].substring(
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
