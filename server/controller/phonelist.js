const phoneModel = require("../models/phone");
const jwt = require('jsonwebtoken');
const { token } = require("morgan");
//jwtKey应该放到环境变量里,但是图方便放这里
const jwtKey = "my_secret_key"

class Phonelist {
    //搜索手机title
    async searchPhone(req, res) {
        //console.log(req.param("n"));
        var title = req.query.title;
        console.log("title is "+title);
        await phoneModel.findByTitle(title, function (err, phonelist) {
            if (err) {
                console.log("Query error!");
            } else {
                res.json({ success:phonelist});//前端去判断disable
            }
        })
    }

    //过滤手机品牌
    async filterBrand(req, res) {
        var brand = req.query.brand;
        await phoneModel.filterBrand(brand, function (err, phonelist) {
            if (err) {
                console.log("Query error!");
            } else {
                res.json({ success:phonelist});//前端去判断disable
            }
        })
    }
    
    //获取所有手机的brand给dropdown选项
    async allBrand(req, res) {
        //.find().distinct是mongooes自带方法
        phoneModel.find().distinct('brand', function(err, phonelist) {
            if (err) {
                console.log("Query error!");
            } else {
                res.json({ success:phonelist});//前端去判断disable
            }
        });
    }
    //过滤手机价格
    async rangeSelector(req, res) {
        var price = Number(req.query.price);
        console.log("price is "+ price);
        await phoneModel.rangeSelector(price, function (err, phonelist) {
            if (err) {
                console.log("Query error!");
            } else {
                res.json({ success:phonelist});//前端去判断disable
            }
        })
    }
}

const phoneController = new Phonelist();
module.exports = phoneController;