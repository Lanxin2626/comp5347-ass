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
        console.log("title is " + title);
        phoneModel.findByTitle(title, function (err, phonelist) {
            if (err) {
                console.log("Query error!");
            } else {
                res.json({ success: phonelist });//前端去判断disable
            }
        })
    }

    //过滤手机品牌
    async filterBrand(req, res) {
        var brand = req.query.brand;
        phoneModel.filterBrand(brand, function (err, phonelist) {
            if (err) {
                console.log("Query error!");
            } else {
                res.json({ success: phonelist });//前端去判断disable
            }
        })
    }

    //获取所有手机的brand给dropdown选项
    async allBrand(req, res) {
        //.find().distinct是mongooes自带方法
        phoneModel.find().distinct('brand', function (err, phonelist) {
            if (err) {
                console.log("Query error!");
            } else {
                res.json({ success: phonelist });//前端去判断disable
            }
        });
    }

    //过滤手机价格
    async rangeSelector(req, res) {
        var price = Number(req.query.price);
        console.log("price is " + price);
        phoneModel.rangeSelector(price, function (err, phonelist) {
            if (err) {
                console.log("Query error!");
            } else {
                res.json({ success: phonelist });//前端去判断disable
            }
        })
    }

    //修改url 数据预处理
    changeUrl(req, res) {
        //MyModel.updateMany({}, { $set: { notInSchema: 1 } });  
        phoneModel.updateMany({ brand: "Samsung" }, { image: "../../../client/static/phone_default_images/Samsung.jpeg" }, function (err, docs) {
            if (err) {
                console.log(err)
            }
        });
        phoneModel.updateMany({ brand: "Apple" }, { image: "../../../client/static/phone_default_images/Apple.jpeg" }, function (err, docs) {
            if (err) {
                console.log(err)
            }
        });
        phoneModel.updateMany({ brand: "HTC" }, { image: "../../../client/static/phone_default_images/HTC.jpeg" }, function (err, docs) {
            if (err) {
                console.log(err)
            }
        });
        phoneModel.updateMany({ brand: "Huawei" }, { image: "../../../client/static/phone_default_images/Huawei.jpeg" }, function (err, docs) {
            if (err) {
                console.log(err)
            }
        });
        phoneModel.updateMany({ brand: "LG" }, { image: "../../../client/static/phone_default_images/LG.jpeg" }, function (err, docs) {
            if (err) {
                console.log(err)
            }
        });
        phoneModel.updateMany({ brand: "Motorola" }, { image: "../../../client/static/phone_default_images/Motorola.jpeg" }, function (err, docs) {
            if (err) {
                console.log(err)
            }
        });
        phoneModel.updateMany({ brand: "Nokia" }, { image: "../../../client/static/phone_default_images/Nokia.jpeg" }, function (err, docs) {
            if (err) {
                console.log(err)
            }
        });
        phoneModel.updateMany({ brand: "Sony" }, { image: "../../../client/static/phone_default_images/Sony.jpeg" }, function (err, docs) {
            if (err) {
                console.log(err)
            }
        });

        res.json({ success: "successfully change url" });
    }

    //top5 即将买完
    async findSoldOut(req, res) {
        phoneModel.findSoldOut(function (err, phonelist) {
            if (err) {
                console.log("Query error!");
            } else {
                res.json({ success: phonelist });//在后端判断disable 因为disable可能占了top5
            }
        })
    }

    //top 5 最好卖家with平均最好评分
    async bestSeller(req, res) {//稍后做
       await phoneModel.aggregate([{$project: { count: { $size:"$reviews" }}}]).limit(5);


        /*phoneModel.bestSeller(function (err, phonelist) {
            if (err) {
                console.log("Query error!");
            } else {
                res.json({ success: phonelist });//在后端判断disable 因为disable可能占了top5
            }
        })*/
    }

}

const phoneController = new Phonelist();
module.exports = phoneController;