var express = require('express');
var app = express();
var bodyParser = require('body-parser'); //添加 body-parser 中间件

// url参数
var url = require('url');

//加载js工具包
var lodash = require('lodash');

//加载https请求
var https= require('https');

//加载promise
var promise = require('promise');

//加载异步
var async =require('async');

app.use(bodyParser.urlencoded({
    extended: false
})); //使用中间件
app.use(bodyParser.json({'Content-Type':'application/json;charset=UTF-8'})); //使用中间件json



//设置跨域访问
app.all('*', function(req, res, next) {

   
    //进行统一拦截token
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Access-Token");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
    
});



//接口调用
/*评论接口*/
var interface_comments = require('./html/interactive/comments');
interface_comments(app);


app.post('/testtoken', function(req, res) {

    res.status(200);
    var pass = req.body.pass;
    var token = req.headers["access-token"];
    console.log(token + '/.//////');
    return;
    if (!pass) {
      
        res.json({
            'msg': '参数错误1'
        });
        return;
    }
  
    res.json({'msg':'成功'})
});


//配置服务端口
var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
})