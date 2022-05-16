const userModel = require("../models/users");
const phoneModel = require("../models/phone")
const jwt = require("jsonwebtoken");
const multer  = require('multer')
const md5 = require("js-md5");
const {token} = require("morgan");
const jwtKey = "my_secret_key";

class user_op {

    //verify token and return payload info
    static verify(req) {
        const token =
            req.body.token || req.query.token || req.headers["authorization"];
        if (!token) return 'none';
        try {
            return jwt.verify(token, jwtKey);
        } catch (err) {
            return 'invalid';
        }
    }

    //get user's profile
    async get_profile(req, res) {
        try {
            // verify
            if(user_op.verify(req) === 'none') {
                return res.status(400).json({
                    code: 400,
                    message: "A token is required for authentication!"
                });
            } else if (user_op.verify(req) === 'invalid') {
                return res.status(401).json({
                    code: 401,
                    message:"Invalid Token!"
                });
            }

            //query user based on id
            let user = await userModel.findById(user_op.verify(req, res)["id"]);

            if (user) {
                return res.status(200).json({
                    code: 200,
                    message:"Query success!",
                    data: {
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email
                    }
                })
            } else {
                return res.status(404).json({
                    code: 404,
                    message:"No such user!"
                })
            }
        } catch (err) {
            console.log("Error in get_profile!", err);
        }
    }

    //change user's password
    async change_password(req, res) {
        try {
            // verify
            if(user_op.verify(req) === 'none') {
                return res.status(400).json({
                    code: 400,
                    message: "A token is required for authentication!"
                });
            } else if (user_op.verify(req) === 'invalid') {
                return res.status(401).json({
                    code: 401,
                    message:"Invalid Token!"
                });
            }

            //query user based on id
            let user = await userModel.findById(user_op.verify(req, res)["id"]);
            if (!user) {
                return res.status(404).json({
                    code: 404,
                    message:"No such user!"
                })
            }

            let {oldPassword, newPassword } = req.body;
            if (!oldPassword || !newPassword) {
                return res.status(400).json({
                    code: 400,
                    message: "All fields must be required"
                });
            }

            if (req.body.newPassword.toString().length <= 5) {
                return res.status(403).json({
                    code: 403,
                    message:"Your new password must have at least 5 characters!"
                })
            }

            //password validate
            let new_pwd = md5(req.body.newPassword.toString());
            let old_pwd = md5(req.body.oldPassword.toString());

            if (new_pwd === user.password) {
                return res.status(403).json({
                    code: 403,
                    message:"Your new password equals to old one!"
                })
            }  else if (old_pwd !== user.password) {
                return res.status(403).json({
                    code: 403,
                    message:"Your old password is incorrect!"
                })
            } else {
                //perform request
                user.updateOne({
                    password: new_pwd
                }).exec((err, result) => {
                    if (err) {
                        console.log("Update error: ", err);
                        return res.status(500).json({
                            code: 500,
                            message:"Server error!"
                        })
                    } else if (result.modifiedCount === 1) {
                        return res.status(200).json({
                            code: 200,
                            message:"Successfully update!"
                        })
                    }
                })
            }
        } catch (err) {
            console.log("Error in change_password!", err);
        }
    }

    //edit user's profile
    async edit_profile(req, res) {
        try {
            // verify
            if(user_op.verify(req) === 'none') {
                return res.status(400).json({
                    code: 400,
                    message: "A token is required for authentication!"
                });
            } else if (user_op.verify(req) === 'invalid') {
                return res.status(401).json({
                    code: 401,
                    message:"Invalid Token!"
                });
            }

            //query user based on id
            let user = await userModel.findById(user_op.verify(req, res)["id"]);
            if (!user) {
                return res.status(404).json({
                    code: 404,
                    message:"No such user!"
                })
            }
            let {firstName, lastName, email, password } = req.body;
            if (!firstName || !lastName || !email || !password ) {
                return res.status(400).json({
                    code: 400,
                    message: "All fields must be required"
                });
            }
            //email regex
            let reg_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            //validate password
            if (md5(password.toString()) !== user.password) {
                return res.status(403).json({
                    code: 403,
                    message:"Password incorrect!"
                })
            } else if(!reg_email.test(email)) {
                return res.status(403).json({
                    code: 403,
                    message:"Invalid email address!"
                })
            } else {
                //validate email in database
                let temp = await userModel.findOne({_id: {$ne: user._id},email:email});
                if (temp) {
                    return res.status(403).json({
                        code: 403,
                        message:"Already have such email address!"
                    })
                }
                //perform request
                user.updateOne({
                    firstname:firstName,
                    lastname:lastName,
                    email:email
                }).exec((err, result) => {
                    if (err) {
                        console.log("Update error: ", err);
                        return res.status(500).json({
                            code: 500,
                            message:"Server error!"
                        })
                    } else if (result.modifiedCount === 1) {
                        return res.status(200).json({
                            code: 200,
                            message:"Successfully update!"
                        })
                    }
                })
            }
        } catch (err) {
            console.log("Error in edit_profile!", err);
        }
    }

    //get listing that related to the user
    async get_listing(req, res) {
        try {
            // verify
            if(user_op.verify(req) === 'none') {
                return res.status(400).json({
                    code: 400,
                    message: "A token is required for authentication!"
                });
            } else if (user_op.verify(req) === 'invalid') {
                return res.status(401).json({
                    code: 401,
                    message:"Invalid Token!"
                });
            }
            //query user based on id
            let user_id = user_op.verify(req, res)["id"];
            if (!user_id) {
                return res.status(404).json({
                    code: 404,
                    message:"No such user!"
                })
            }
            //query listings using projection
            let listings = await phoneModel.find(
                {seller:user_id},
                {title: 1, brand: 1, image: 1, price: 1, stock: 1, disabled: 1}
                )

            for (let list in listings) {
                if (listings[list].disabled === "" || listings[list].disabled === null || listings[list].disabled === undefined) {
                    listings[list].disabled = 'false'
                }
            }

            if (listings.length > 0) {
                return res.status(200).json({
                    code: 200,
                    message:"Query success!",
                    data: {listings}
                })
            } else {
                return res.status(404).json({
                    code: 404,
                    message:"No phone listing exist!",
                })
            }
        } catch (err) {
            console.log("Error in get_listing!", err);
        }
    }

    //add a phone listing and upload a file
    async add_listing_with_file(req, res) {
        try {
            // verify
            if(user_op.verify(req) === 'none') {
                return res.status(400).json({
                    code: 400,
                    message: "A token is required for authentication!"
                });
            } else if (user_op.verify(req) === 'invalid') {
                return res.status(401).json({
                    code: 401,
                    message:"Invalid Token!"
                });
            }
            //query user id
            let user_id = user_op.verify(req, res)["id"];
            let reg_positive_int = /^[1-9]\d*$/;
            let reg_positive_float = /^([1-9]\d{0,6}|0)(\.\d{1,2})?$/;

            if (!user_id) {
                return res.status(404).json({
                    code: 404,
                    message:"No such user!"
                });
            }

            let {brand, price, stock, title, disabled} = req.body;
            if (!brand || !price || !stock || !title || !disabled ) {
                return res.status(400).json({
                    code: 400,
                    message: "All fields must be required"
                });
            } else if (disabled.toString().toLowerCase() !== "false" && disabled.toString().toLowerCase() !== "true") {
                //validate disabled attribute
                return res.status(403).json({
                    code: 403,
                    message: "Disabled attribute error!"
                });
            } else if (!reg_positive_int.test(stock) || stock === "0") {
                //validate stock
                return res.status(403).json({
                    code: 403,
                    message: "Stock attribute error!"
                });
            } else if (!reg_positive_float.test(price) || price === "0") {
                //validate price
                return res.status(403).json({
                    code: 403,
                    message: "Price attribute error!"
                });
            } else {
                let temp = await phoneModel.findOne({title:title,brand:brand})
                if (temp) {
                    return res.status(403).json({
                        code: 403,
                        message: "Already have such phone!"
                    });
                }
                //perform request
                try {
                    let pre_path = "../../"
                    let image = pre_path + req.file.path;
                    if (disabled.toString().toLowerCase() === 'true') {
                        let newListing = new phoneModel({
                            title,
                            image,
                            brand,
                            stock,
                            seller:user_id,
                            price,
                            reviews: [],
                            disabled:disabled.toString().toLowerCase()
                        })
                        let save = await newListing.save();
                        if (save) {
                            return res.status(200).json({
                                code: 200,
                                message:"Phone listing created successfully!"
                            });
                        }
                    } else if (disabled.toString().toLowerCase() === 'false') {
                        let newListing = new phoneModel({
                            title,
                            image,
                            brand,
                            stock,
                            seller:user_id,
                            price,
                            reviews: []
                        })
                        let save = await newListing.save();
                        if (save) {
                            return res.status(200).json({
                                code: 200,
                                message:"Phone listing created successfully!"
                            });
                        }
                    }
                } catch (err) {
                    console.log("Save error: ", err);
                    return res.status(500).json({
                        code: 500,
                        message:"Server error!"
                    })
                }
            }
        } catch (err) {
            console.log("Error in add_listing!", err);
        }
    }



    //enable/disable a phone listing
    async listing_operation(req, res) {
        try {
            // verify
            if(user_op.verify(req) === 'none') {
                return res.status(400).json({
                    code: 400,
                    message: "A token is required for authentication!"
                });
            } else if (user_op.verify(req) === 'invalid') {
                return res.status(401).json({
                    code: 401,
                    message:"Invalid Token!"
                });
            }
            //query user based on id
            let user_id = user_op.verify(req, res)["id"];
            if (!user_id) {
                return res.status(404).json({
                    code: 404,
                    message:"No such user!"
                });
            }
            let {phoneId, disabled} = req.body;
            if (!phoneId || !disabled ) {
                return res.status(400).json({
                    code: 400,
                    message: "All fields must be required"
                });
            } else if (disabled.toString().toLowerCase() !== "false" && disabled.toString().toLowerCase() !== "true") {
                //validate disabled attribute
                return res.status(403).json({
                    code: 403,
                    message: "Attribute error!"
                });
            } else if (phoneId.length > 24) {
                //validate id
                return res.status(403).json({
                    code: 403,
                    message: "Invalid ID!"
                });
            }
            //query phone based on phone_id and seller
            let phone = phoneModel.findOne({_id:phoneId,seller:user_id});
            if (!phone) {
                return res.status(404).json({
                    code: 404,
                    message:"No such phone!"
                })
            } else {

                if (disabled.toString().toLowerCase() === 'false') {
                    await phone.updateOne({
                        $unset: { disabled: "" }
                    }).exec((err, result) => {
                        if (err) {
                            console.log("Update error: ", err);
                            return res.status(500).json({
                                code: 500,
                                message:"Server error!"
                            })
                        } else if (result.modifiedCount === 1) {
                            return res.status(200).json({
                                code: 200,
                                message:"Successfully update!"
                            })
                        }
                    })
                } else {
                    disabled = disabled.toString().toLowerCase();
                    await phone.updateOne({
                        disabled:disabled
                    }).exec((err, result) => {
                        if (err) {
                            console.log("Update error: ", err);
                            return res.status(500).json({
                                code: 500,
                                message:"Server error!"
                            })
                        } else if (result.modifiedCount === 1) {
                            return res.status(200).json({
                                code: 200,
                                message:"Successfully update!"
                            })
                        }
                    })
                }
            }
        } catch (err) {
            console.log("Error in listing_operation!", err);
        }
    }

    //remove a phone listing
    async remove_listing(req, res) {
        try {
            // verify
            if(user_op.verify(req) === 'none') {
                return res.status(400).json({
                    code: 400,
                    message: "A token is required for authentication!"
                });
            } else if (user_op.verify(req) === 'invalid') {
                return res.status(401).json({
                    code: 401,
                    message:"Invalid Token!"
                });
            }
            //query user based on id
            let user_id = user_op.verify(req, res)["id"];
            if (!user_id) {
                return res.status(404).json({
                    code: 404,
                    message:"No such user!"
                });
            }
            let phoneId = req.query["phoneId"];
            if (!phoneId) {
                return res.status(400).json({
                    code: 400,
                    message: "All fields must be required!"
                });
            } else if (phoneId.length > 24) {
                //validate id
                return res.status(403).json({
                    code: 403,
                    message: "Invalid ID!"
                });
            }
            try {
                //delete phone listing based on id
                let deletePhone = await phoneModel.findOneAndDelete({_id:phoneId,seller:user_id});
                if (!deletePhone) {
                    return res.status(404).json({
                        code: 404,
                        message:"No such phone!"
                    })
                } else {
                    return res.status(200).json({
                        code: 200,
                        message:"Successfully remove!"
                    })
                }
            } catch (err) {
                console.log("Delete error: ", err);
                return res.status(500).json({
                    code: 500,
                    message:"Server error!"
                })
            }
        } catch (err) {
            console.log("Error in remove_listing!", err);
        }
    }

    //get listing comments
    async get_comments(req, res) {
        try {
            // verify
            if(user_op.verify(req) === 'none') {
                return res.status(400).json({
                    code: 400,
                    message: "A token is required for authentication!"
                });
            } else if (user_op.verify(req) === 'invalid') {
                return res.status(401).json({
                    code: 401,
                    message:"Invalid Token!"
                });
            }
            //query user based on id
            let user_id = user_op.verify(req, res)["id"];
            if (!user_id) {
                return res.status(404).json({
                    code: 404,
                    message:"No such user!"
                });
            }
            try {
                let Comments = await phoneModel.find(
                    {seller:user_id},
                    {title:1, brand:1, reviews:1}
                ).populate("reviews.reviewer","firstname lastname")
                return res.status(200).json({
                    code: 200,
                    message:"Query success!",
                    data: {Comments}
                })
            } catch (err) {
                console.log("Query error: ", err);
                return res.status(500).json({
                    code: 500,
                    message:"Server error!"
                })
            }
        } catch (err) {
            console.log("Error in get_comments!", err);
        }
    }
}

const userController = new user_op();
module.exports = userController;