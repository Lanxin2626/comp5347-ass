const phoneModel = require("../models/phone");
const jwt = require('jsonwebtoken');
const { token } = require("morgan");
//jwtKey应该放到环境变量里,但是图方便放这里
const jwtKey = "my_secret_key"

class Phonelist {
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
}

const phoneController = new Phonelist();
module.exports = phoneController;