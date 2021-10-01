const express = require('express');
const router = require('./router');
const expressJwt = require('express-jwt');
const path = require('path');

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,DELETE,HEAD,PUT,PATCH');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Custom-Header");
  next();
});

// 托管静态文件
app.use(express.static(path.join(__dirname, 'assets')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(expressJwt({
  secret: 'hiiragi10073',
  algorithms: ['HS256']
}));

app.use((err, req, res, next) => {
  if (req.originalUrl.indexOf('/login') > -1) {
    return next();
  }
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({ code: -1, message: '登录信息已失效，请重新登录' });
  } else {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
  }
})

app.use(router);

app.listen('8090', () => {
  console.log('服务器已开启，端口：8090');
})