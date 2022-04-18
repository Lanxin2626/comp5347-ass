//const bcrypt = require("bcryptjs");
const userModel = require("../models/users");
//const jwt = require("jsonwebtoken");
//Jwt for further use
//const { JWT_SECRET } = require("../config/keys");

class Auth {
    /*test(req,res){
        return res.json({ test:"success5432" });
    }*/

    /* User Registration/Signup controller  */
    async userSignup(req, res) {
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var password = req.body.pwd;
        var cpassword = req.body.cpwd;
        var email = req.body.email;
        let error = {};
        //判断空值
        if (!firstname || !lastname || !password || !email) {
            error = {
                firstname: "Filed must not be empty",
                lastname: "Filed must not be empty",
                password: "Filed must not be empty",
                email: "Filed must not be empty",
            };
            return res.json({ error });
        }
        //判断confrim password
        else if (cpassword != password) {
            error = {
                pwdConfirm: "Password doesn't match"
            };
            return res.json({ error });
        }
        else {
            if ((password.length > 255) | (password.length < 5)) {
                error = {
                    password: "Password must be at least 5 charecter",
                };
                return res.json({ error });
            }
            else {
                //判断邮箱格式
                var szReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                var emailCheck = szReg.test(email);
                if(!emailCheck){
                    error = {
                        email: "Your email address is not valid",
                    };
                    return res.json({ error });
                }
                // If username exists in Database then:
                try {
                    //加密稍后做
                    //password = bcrypt.hashSync(password, 10);
                    const data = await userModel.findOne({ email: email });
                    if (data) {
                        error = {
                            email: "email already existed, please try again",
                        };
                        return res.json({ error });
                    } else {
                        let newUser = new userModel({
                            firstname,
                            lastname,
                            email,
                            password,
                        });
                        newUser
                            .save()
                            .then((data) => {
                                return res.json({
                                    success: "Account create successfully. Please login",
                                });
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }
    }

    async userLogin(req, res) {
        var email = req.body.email;
        var password = req.body.pwd;
        let error = {};
        if (!email || !password) {
            error = {
                email: "Filed must not be empty",
                password: "Filed must not be empty",
            };
            return res.json({ error });
        }
        else {
            try {
                const data = await userModel.findOne({ email: email, password: password });
                //console.log(data);
                if (!data) {
                    error = {
                        fail: "email or password not correct, please try again",
                    };
                    return res.json({ error });
                }
                else {
                    return res.json({
                        success: "Logged in",
                    });
                }
            } catch (error) {
                console.log(err);
            }
        }
    }
}
const authController = new Auth();
module.exports = authController;