/*
* 该模块是UI路由器模块，用于管理UI路由，以后配置新页面，在这里定义路由即可
* */
let {Router} = require('express')
let cookieParser = require('cookie-parser')
//引入用户模型
let userModel = require('../model/userModel')
//引入 空调模型
let airConditioner = require('../model/airConditioner')
let firstGoods = require('../model/firstGoods')

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

// 企业采购
router.get('/businessBuy',(req,res)=>{
    res.render('businessBuy')
})

// 首页
// router.get('/first',(req,res)=>{
//     console.log(1)
//     firstGoods.find().limit(3).exec((err,data)=>{
//         console.log(2)
//         console.log(data)
//     })
//     console.log(3)
//     res.send('123')
//     //res.render('first')
// })
router.get('/',(req,res)=>{
    firstGoods.find().limit(6).exec(function(err,data){
        var  a =data      
        firstGoods.find().limit(6).skip(6).exec(function(err,data){
            var b = data
            firstGoods.find().limit(6).skip(12).exec(function(err,data){
                var c = data
                firstGoods.find().limit(6).skip(18).exec(function(err,data){
                    var d = data
                    firstGoods.find().limit(6).skip(24).exec(function(err,data){
                        var e = data
                        firstGoods.find().limit(6).skip(30).exec(function(err,data){
                            var f = data
                            firstGoods.find().limit(6).skip(36).exec(function(err,data){
                                var g = data
                                firstGoods.find().limit(4).skip(42).exec(function(err,data){
                                    var h = data
                                    res.render('first',{a,b,c,d,e,f,g,h})
                                })
                            })
                        })
                    })
                })
            })
        })
    }) 
})


module.exports = router