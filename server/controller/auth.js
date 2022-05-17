const userModel = require("../models/users");
//md5 encryption
const md5 = require('js-md5');
const jwt = require('jsonwebtoken');
const { token } = require("morgan");
//jwtKey应该放到环境变量里,但是图方便放这里
const jwtKey = "my_secret_key"
// create reusable transporter object using the default SMTP transport 
var nodemailer = require('nodemailer');
var checkEmailVerification = false;
var emialMustBetheSame = "";
var recordEmail = "";

class Auth {

    /* User Registration/Signup controller  */
    async userSignup(req, res) {
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var password = req.body.pwd;
        var cpassword = req.body.cpwd;
        var email = req.body.email;
        let error = {};
        //const{test1,test2,test3,test4,test5}=req.body;
        //判断空值
        if (!firstname || !lastname || !password || !email || !cpassword) {
            error = {
                firstname: "Field must not be empty",
                lastname: "Field must not be empty",
                password: "Field must not be empty",
                email: "Field must not be empty",
                cpassword: "Field must not be empty",
            };
            return res.json({ error });
        }
        //判断confrim password
        else if (cpassword !== password) {
            error = {
                pwdConfirm: "Password doesn't match"
            };
            return res.json({ error });
        }
        else {
            if ((password.length > 255) || (password.length < 5)) {
                error = {
                    password: "Password must be at least 5 characters",
                };
                return res.json({ error });
            }
            else {
                //判断邮箱格式
                var szReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                var emailCheck = szReg.test(email);
                if (!emailCheck) {
                    error = {
                        email: "Your email address is not valid",
                    };
                    return res.json({ error });
                }
                // If username exists in Database then:
                try {
                    const data = await userModel.findOne({ email: email });
                    if (data) {
                        error = {
                            email: "email already existed, please try again",
                        };
                        return res.json({ error });
                    } else {

                        if (!checkEmailVerification) {//如果没有认证邮箱
                            emialMustBetheSame = "";
                            error = {
                                email: "Please verify your email first",
                            };
                            return res.json({ error });
                        }
                        else if (email != emialMustBetheSame) {
                            error = {
                                email: "The email is not the verified email",
                            };
                            checkEmailVerification = false;
                            emialMustBetheSame = "";
                            return res.json({ error });
                        }

                        //如果认证了邮箱
                        else {
                            var passwordEncrypt = md5(password);
                            console.log(passwordEncrypt);
                            //跟sql不一样这里usermodel必须跟model里fields一样
                            let newUser = new userModel({
                                firstname,
                                lastname,
                                email,
                                password: passwordEncrypt
                                ,
                            });
                            //两个属性变成默认值
                            checkEmailVerification = false;
                            emialMustBetheSame = "";
                            //储存入数据库
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
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }
    }

    //注册时发送邮件到指定邮箱
    checkEmail(req, res) {
        //接收前端邮件
        var email = req.body.email;
        let error = {};
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: '587',
            auth: {
                user: "saufontt@gmail.com",
                pass: "Zxf28453000"
            },
            secureConnection: 'false',
            tls: {
                ciphers: 'SSLv3'
            }
        });
        //判断邮箱格式
        var szReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var emailCheck = szReg.test(email);
        if (!emailCheck) {
            error = {
                email: "Your email address is not valid",
            };
            return res.json({ error });
        }

        // setup e-mail data with unicode symbols 
        var mailOptions = {
            from: "saufontt@gmail.com", // sender address 
            to: email, // 从前端接收email
            subject: "test", // Subject line 
            html: '<a href="http://localhost:3000/api/user/emailVerified">click here to verrify your email</a>' // html body 
        };

        // send mail with defined transport object 
        transporter.sendMail(mailOptions, function (err, info) {
            //发送邮件失败情况
            if (err) {
                console.log("ERROR----" + err);
                error = {
                    email: "fail to send verification to your email",
                };
                return res.json({ error });
            }
            console.log('Message sent: ' + info.response);
            //发送邮件成功 更改emialMustBetheSame值为输入邮箱
            emialMustBetheSame = email;
            return res.json({
                success: "successfully send email",
            });
        });

    }
    //修改checkEmailVerification为true 前端不用管
    emailVerified(req, res) {
        checkEmailVerification = true;
        console.log("xxxx" + checkEmailVerification);
        res.send('<h1>Congrats,you have verified your email!</h1>');
    }

    async userLogin(req, res) {
        var email = req.body.email;
        var password = req.body.pwd;
        var passwordEncrypt = md5(password);
        let error = {};
        //输入为空
        if (!email || !password) {
            error = {
                email: "Field must not be empty",
                password: "Field must not be empty",
            };
            return res.json({ error });
        }
        else {
            try {
                //查询数据库判断账号密码正确性
                const data = await userModel.findOne({ email: email, password: passwordEncrypt });
                //console.log(data);
                if (!data) {
                    error = {
                        fail: "email or password not correct, please try again",
                    };
                    return res.json({ error });
                }
                else {
                    //登陆成功
                    jwt.sign(
                        //传入firstname,lastname,email
                        {
                            id: data.id,
                            firstname: data.firstname,
                            lastname: data.lastname,
                            email: email,
                        },
                        jwtKey,
                        { expiresIn: '3600s' },
                        (err, token) => {
                            if (err) {
                                return res.json({ error: err });
                            }
                            return res.json({ success: "Logged in", token });
                        }
                    );
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    async userLogout(req, res) {
        return res.json({
            //in front-end: localStorage.removeItem("name of localStorage variable you want to remove");
            logout: "Delete localstorage",
        });
    }

    // jwt测试,成功则返还message,失败返还403
    testJwt(req, res) {
        return Auth.checkJwtExpire(req, res);
    }


    //reset password
    //1. 首先判断email是否存在
    async isVaildEmial(req, res) {
        var email = req.body.email;
        let error = {};
        const data = await userModel.findOne({ email: email });
        //如果输入email为空
        if (email == null || email == "") {
            error = {
                email: "Field must not be empty",
            };
            return res.json({ error });
        }

        //如果没有找到email
        else if (data == null) {
            error = {
                email: "cannot find your email",
            };
            return res.json({ error });
        }

        //如果email存在
        else if (email == data.email) {
            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: '587',
                auth: {
                    user: "saufontt@gmail.com",
                    pass: "Zxf28453000"
                },
                secureConnection: 'false',
                tls: {
                    ciphers: 'SSLv3'
                }
            });

            // setup e-mail data with unicode symbols 
            var mailOptions = {
                from: "saufontt@gmail.com", // sender address 
                to: email, // 从前端接收email
                subject: "testreset", // Subject line 
                html: '<a href="http://localhost:5501/client/views/reset_password.html">click here to reset your password</a>' // html body 
            };

            // send mail with defined transport object 
            transporter.sendMail(mailOptions, function (err, info) {
                //发送邮件失败情况
                if (err) {
                    console.log("ERROR----" + err);
                    error = {
                        email: "fail to send reset link to your email",
                    };
                    return res.json({ error });
                }
                console.log('Message sent: ' + info.response);
                recordEmail = email;
                return res.json({
                    success: "A reset link was sent to your email",
                });
            });

        }
    }

    //reset password
    //2. 判断两次输入邮箱是否合法
    async inputNewPwd(req, res) {
        var newpwd = req.body.pwd;
        var cpwd = req.body.cpwd;
        var error = {};
        //判断为空的情况
        if (!newpwd || !cpwd) {
            error = {
                pwd: "Field must not be empty",
                cpwd: "Field must not be empty",
            };
            return res.json({ error });
        }
        //密码小于5位数
        else if (newpwd.length < 5) {
            error = {
                pwdlen: "Password must be at least 5 characters",
            };
            return res.json({ error });
        }
        //不为空的情况 且 大于等于5位数
        else {
            //两次输入密码不相等的情况
            if (newpwd != cpwd) {
                error = {
                    fail: "Your password does not match",
                };
                return res.json({ error });
            }
            else {
                var user=await userModel.findOne({ email: recordEmail });
                var oldpwd=user.password;
                var passwordEncrypt = md5(newpwd);
                //if password is same as old one
                console.log("xxx "+passwordEncrypt);
                console.log("xxx "+oldpwd);
                if(passwordEncrypt==oldpwd){
                    error = {
                        fail: "Your new password equals to old one!",
                    };
                    return res.json({ error });
                }
                else{
                    const data = await userModel.findOneAndUpdate({ email: recordEmail }, { password: passwordEncrypt });
                    recordEmail="";
                    return res.json({
                        success: "Your password has been reset",
                    });
                }
            }
        }
    }

    //static 方法可以复用->后台除了登录登出每个方法都需要调用来判断用户权限情况
    static checkJwtExpire(req, res) { //Bearer -> outh 2.0规定
        //前端发送token资料
        //https://blog.csdn.net/m0_37528005/article/details/124082570?utm_medium=distribute.pc_relevant.none-task-blog-2
        //~default~baidujs_baidulandingword~default-1.pc_relevant_antiscanv2&spm=1001.2101.3001.4242.2&utm_relevant_index=4
        const headers = req.headers;
        const token = headers['authorization'].split(' ')[1];
        //应该是前端从localstorage拿到token传到后端
        //后端解析得到用户信息
        jwt.verify(token, jwtKey, (err, payload) => {
            //console.log("this is payload :"+payload); 后台可以从payload里取出用户信息
            if (err) return res.sendStatus(403);//之后可以改成false 再做判断
            return res.json({ message: 'authenticate successfully', payload });//之后可以改成return true
        });
    }

}
const authController = new Auth();
module.exports = authController;