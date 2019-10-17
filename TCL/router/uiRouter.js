/*
* 该模块是UI路由器模块，用于管理UI路由，以后配置新页面，在这里定义路由即可
* */
let {Router} = require('express')
let cookieParser = require('cookie-parser')
//引入用户模型
let userModel = require('../model/userModel')
//引入 空调模型
let airConditioner = require('../model/airConditioner')

let router = new Router()
//引入path模块，path模块是node中的核心模块，无需下载，直接引入即可使用
let {resolve} = require('path')
router.use(cookieParser())


//UI路由--登录
router.get('/login', (request, response) => {
    //let filePath = resolve(__dirname,'../public/login.html')
    //response.sendFile(filePath)
    const {email} = request.query
    response.render('login', {errMsg: {email}})
})
//UI路由--注册
router.get('/register', (request, response) => {
    //let filePath = resolve(__dirname,'../public/register.html')
    //response.sendFile(filePath)
    response.render('register', {errMsg: {}})
})

//空调列表展示
router.get('/usercenter/airConditioner', (request, response) => {
    airConditioner.find().limit(6).exec((err,data)=>{
        console.log(data)
        response.render('airConditioner', {data})
    })

})

//UI路由--个人中心
router.get('/usercenter', async (request, response) => {
    const {_id} = request.cookies
    if (_id) {
        let result = await userModel.findOne({_id})
        if (result) {
            response.render('usercenter', {nickName: result.nick_name})
        } else {
            console.log('用户非法修改了cookie')
            response.redirect('/login')
        }
    } else {
        response.redirect('/NoLoginNav')
    }

})

module.exports = router