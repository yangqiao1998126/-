let mongoose = require('mongoose')
//操作数据库
//1.请来一个保安 ------- 引入约束Schema
let Schema = mongoose.Schema

//2.制定一个进入你家的规则 -------- 创建一个约束对象实例
let bigNew = new Schema({
    src: String,
    src1:String,
    src2:String,
    title: String,
    desc: String,
})

/*3.告诉保安你的规则 ------- 创建模型对象
第一个参数与数据库中的集合相对应，第二个参数指定约束对象实例
只要生成了模型对象，就可以进行数据的：增删改查*/
module.exports = mongoose.model('bigNews', bigNew)