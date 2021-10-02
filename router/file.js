const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const formidable = require('formidable')
const { v4: uuid} = require('uuid')

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
    const file = files.file
    const type = file.type.split('/')
    const etc = type.pop()
    const fileType = type.pop()
    let targetDir
    if (etc === 'html') {
      targetDir = process.env.BLOG_FILE_PATH
    } else if (fileType === 'image') {
      targetDir = process.env.IMAGE_PATH
    }
    const filePath = process.env.TEMP_PATH + file.path
    const fileName = uuid() + '_' + file.name
    const targetFile = path.join(targetDir, fileName)

    fs.rename(filePath, targetFile, (err) => {
      if (err) {
        console.log(err)
        res.json({
          status: 401,
          message: '文件上传失败'
        })
        return
      }
      const fileUrl =
        process.env.FILE_URL + '/' + targetDir.split('/').pop() + '/' + fileName
      res.json({
        status: 200,
        message: '文件上传成功',
        url: fileUrl
      })
    })
  })
})

module.exports = router
