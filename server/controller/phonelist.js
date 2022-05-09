const phoneModel = require("../models/phone");
const jwt = require('jsonwebtoken');
const { token } = require("morgan");
//jwtKey应该放到环境变量里,但是图方便放这里
const jwtKey = "my_secret_key"

class Phonelist {
    
    //JWT 验证
    static verify(req, res) {
        const token =
            req.body.token || req.query.token || req.headers["authorization"];
        if (!token) {
            return res.status(400).json({
                code: 400,
                message: "A token is required for authentication!"
            });
        }
        try {
            return jwt.verify(token, jwtKey);
        } catch (err) {
            return res.status(401).json({
                code: 401,
                message:"Invalid Token!"
            });
        }
    }

    //搜索手机title
    async searchPhone(req, res) {
        //console.log(req.param("n"));
        var title = req.query.title;
        console.log("title is " + title);
        phoneModel.findByTitle(title, function (err, phonelist) {
            if (err) {
                console.log("Query error!");
            } else {
                res.json({ success: phonelist });
            }
        })
    }

    //过滤手机品牌 价格品牌drop down需要一起工作吗?
    async filterBrand(req, res) {
        var brand = req.query.brand;
        phoneModel.filterBrand(brand, function (err, phonelist) {
            if (err) {
                console.log("Query error!");
            } else {
                res.json({ success: phonelist });
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
                res.json({ success: phonelist });
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
                res.json({ success: phonelist });
            }
        })
    }

    //同时作用 brand, title, range
    async searchPhoneList(req, res) {
        var title = req.query.title;
        var brand = req.query.brand;
        var price = req.query.price;
        var params = { title, brand, price };
        phoneModel.searchPhoneList(params, function (err, phonelist) {
            if (err) {
                console.log(err);
            } else {
                res.json({ success: phonelist });
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
        phoneModel.bestSeller(function (err, phonelist) {
            if (err) {
                console.log("Query error!");
            } else {
                res.json({ success: phonelist });//在后端判断disable 因为disable可能占了top5
            }
        })
    }

    //find specific phone according to phone id
    async findPhone(req, res) {
        var phoneId = req.query.id;
        phoneModel.findPhone(phoneId, function (err, phonelist) {
            if (err) {
                console.log("Query error!");
            } else {
                res.json({ success: phonelist });//在后端判断disable 因为disable可能占了top5
            }
        })
    }

    async comment(req,res){
        var user_id = Phonelist.verify(req, res)["id"]
        //前端传参id,rating,comments
        var phoneId =req.body.id;
        var rating=req.body.rating;
        var comments=req.body.comments;
        //定义错误jason
        var error={};
        var pushData={reviewer:user_id,rating:rating,comment:comments};
        if(!comments||!rating){
            error = {
                comments: "Field must not be empty",
                rating: "Field must not be empty",
            };
            return res.json({ error });  
        }
        const data = await phoneModel.findOneAndUpdate({ _id: phoneId }, {$push : { reviews: pushData }});
        return res.json({
            success: "You have commented successfully",
        });
    
    }
}


const phoneController = new Phonelist();
module.exports = phoneController;