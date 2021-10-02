const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const {
  login,
  getUserData,
  getMenuData,
  updateUserData
} = require('../controller/user')

// 登录
router.post('/login', (req, res) => {
  const { username, password } = req.body

  login(username, (err, row) => {
    if (err) {
      throw err
    } else if (row.length && row[0].password === password) {
      const token =
        'Bearer ' +
        jwt.sign({ username }, 'hiiragi10073', { expiresIn: 3600 * 24 * 3 })

      res.json({
        status: 200,
        message: '登录成功',
        data: { token: token }
      })
    } else {
      res.send({
        status: 401,
        message: '登录失败，用户名或密码错误',
        data: {}
      })
    }
  })
})

// 获取用户信息
router.get('/user-info', (req, res) => {
  const { username } = req.user
  getUserData(username, (err, row) => {
    if (err) {
      throw err
    } else {
      res.json({
        status: 200,
        message: '数据获得成功',
        data: row[0]
      })
    }
  })
})

// 获取菜单信息
router.get('/menu', (req, res) => {
  getMenuData((err, row) => {
    if (err) {
      throw err
    } else {
      res.json({
        status: 200,
        message: '菜单数据获取成功',
        data: row
      })
    }
  })
})

// 存储上传的头像图片
router.post('/updateFile', (req, res) => {
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
    const targetDir = path.join(__dirname, '../assets/profile')
    const filePath = files.fileName.path.substring(
      files.fileName.path.lastIndexOf('/')
    )
    const fileName = 'profile_' + Date.now() + '.jpg'
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
        filePath: '/profile/' + fileName
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

// 修改用户信息
router.post('/updateUser', (req, res) => {
  const { username } = req.user

  updateUserData(username, req.body, (err) => {
    if (err) {
      res.json({
        status: 401,
        message: '数据修改失败'
      })
      return
    }
    res.json({
      status: 302,
      message: '数据修改成功，请重新登录'
    })
  })
})

module.exports = router
