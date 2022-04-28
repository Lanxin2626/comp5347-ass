const phoneModel = require("../models/phone")
const userModel = require("../models/users");
const cartModel = require("../models/shoppingcart")
const jwt = require('jsonwebtoken');

const jwtKey = "my_secret_key"


class cart {

    //verify token and return payload info
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

    //add an item to shopping cart
    async add_to_cart(req, res) {
        try {
            //query user based on id
            let user_id = cart.verify(req, res)["id"]
            let user = await userModel.findById(user_id);
            if (!user) {
                return res.status(404).json({
                    code: 404,
                    message:"No such user!"
                })
            }
            //validate number of item
            let reg = /^\d+(\.\d+)?$/
            let {phoneId, number} = req.body;
            if (!phoneId || !number) {
                return res.status(400).json({
                    code: 400,
                    message: "All filled must be required"
                });
            } else if (phoneId.length > 25 || !reg.test(number) || number === "0") {
                return res.status(403).json({
                    code: 403,
                    message: "Invalid attribute!"
                });
            } else {
                //validate phone
                let phone = await phoneModel.findById(phoneId);
                if (!phone) {
                    return res.status(404).json({
                        code: 404,
                        message:"No such phone!"
                    })
                }

                //validate stock number
                if (number > phone.stock) {
                    return res.status(403).json({
                        code: 403,
                        message: "Number exceeds stock!"
                    });
                }

                //validate phone status
                if (phone.disabled === "true") {
                    return res.status(403).json({
                        code: 403,
                        message: "This phone is unavailable!"
                    });
                }

                let cart = await cartModel.findOne({phone_id:phoneId, user_id:user_id});
                if (cart) {
                    //perform update request
                    let new_number = parseInt(cart.number) + parseInt(number);
                    let new_money = parseFloat(cart.money) + number * phone.price;
                    cart.updateOne({
                        number: new_number,
                        money: new_money
                    }).exec((err, result) => {
                        if (err) {
                            console.log("Save error: ", err);
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
                    //perform new item request
                    try {
                        let new_item = new cartModel({
                            user_id: user_id,
                            phone_id: phoneId,
                            number: number,
                            money: phone.price * number
                        })
                        let save = await new_item.save();
                        if (save) {
                            return res.status(200).json({
                                code: 200,
                                message: "Successfully add!"
                            });
                        }
                    } catch (err) {
                        console.log("Save error: ", err);
                        return res.status(500).json({
                            code: 500,
                            message: "Server error!"
                        })
                    }
                }
            }
        } catch (err) {
            console.log("Error in add_to_cart!", err);
        }
    }

    //edit item number in the shopping cart
    async edit_item(req, res) {
        try {
            //query user based on id
            let user_id = cart.verify(req, res)["id"]
            let user = await userModel.findById(user_id);
            if (!user) {
                return res.status(404).json({
                    code: 404,
                    message:"No such user!"
                })
            }
            //validate number of item
            let reg = /^\d+(\.\d+)?$/
            let {phoneId, number} = req.body;
            if (!phoneId || !number) {
                return res.status(400).json({
                    code: 400,
                    message: "All filled must be required"
                });
            } else if (phoneId.length > 25 || !reg.test(number)) {
                return res.status(403).json({
                    code: 403,
                    message: "Invalid attribute!"
                });
            } else {
                let cart = await cartModel.findOne({phone_id:phoneId, user_id:user_id});
                //validate phone
                let phone = await phoneModel.findById(phoneId);
                if (!phone) {
                    return res.status(404).json({
                        code: 404,
                        message:"No such phone!"
                    })
                }
                if (cart) {
                    if (number === "0") {
                        //perform remove request
                        try {
                            cart.deleteOne({phone_id:phoneId, user_id:user_id});
                            return res.status(200).json({
                                code: 200,
                                message:"Successfully delete!"
                            })
                        } catch (err) {
                            console.log("Delete error: ", err);
                            return res.status(500).json({
                                code: 500,
                                message:"Server error!"
                            })
                        }
                    } else {
                        //perform update request
                        //validate stock number
                        if (number > phone.stock) {
                            return res.status(403).json({
                                code: 403,
                                message: "Number exceeds stock!"
                            });
                        }
                        //validate phone status
                        if (phone.disabled === "true") {
                            return res.status(403).json({
                                code: 403,
                                message: "This phone is unavailable!"
                            });
                        }
                        cart.updateOne({
                            number: number,
                            money: number * phone.price
                        }).exec((err, result) => {
                            if (err) {
                                console.log("Save error: ", err);
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
                } else {
                    return res.status(403).json({
                        code: 403,
                        message: "No such cart record!"
                    });
                }
            }
        } catch (err) {
            console.log("Error in edit_item!", err);
        }
    }

    //query all items in the shopping cart
    async query_cart(req, res) {
        try {
            //query user based on id
            let user_id = cart.verify(req, res)["id"]
            let user = await userModel.findById(user_id);
            if (!user) {
                return res.status(404).json({
                    code: 404,
                    message:"No such user!"
                })
            }
            try {
                let items = await cartModel.find(
                    {user_id:user_id},
                    {_id:0,__v:0,user_id:0}
                ).populate("phone_id", "title brand image price");
                if (items.length > 0) {
                    return res.status(200).json({
                        code: 200,
                        message:"Query success!",
                        data: {items}
                    })
                } else {
                    return res.status(404).json({
                        code: 404,
                        message:"No items!"
                    })
                }
            } catch (err) {
                console.log("Query error: ", err);
                return res.status(500).json({
                    code: 500,
                    message:"Server error!"
                })
            }
        } catch (err) {
            console.log("Error in query_cart!", err);
        }
    }

    async delete_item(req, res) {
        try {
            //query user based on id
            let user_id = cart.verify(req, res)["id"];
            if (!user_id) {
                return res.status(404).json({
                    code: 404,
                    message: "No such user!"
                });
            }
            let phoneId = req.query["phoneId"];
            if (!phoneId) {
                return res.status(400).json({
                    code: 400,
                    message: "All filled must be required!"
                });
            } else if (phoneId.length > 24) {
                //validate id
                return res.status(403).json({
                    code: 403,
                    message: "Invalid ID!"
                });
            }
            try {
                //delete cart item based on id
                let deleteItem = await cartModel.findOneAndDelete({phone_id: phoneId, user_id: user_id});
                if (!deleteItem) {
                    return res.status(404).json({
                        code: 404,
                        message: "No such item!"
                    })
                } else {
                    return res.status(200).json({
                        code: 200,
                        message: "Successfully remove!"
                    })
                }
            } catch (err) {
                console.log("Delete error: ", err);
                return res.status(500).json({
                    code: 500,
                    message: "Server error!"
                })
            }
        } catch (err) {
            console.log("Error in delete_item!", err);
        }
    }

    async confirm_transaction(req, res) {
        try {
            //query user based on id
            let user_id = cart.verify(req, res)["id"];
            if (!user_id) {
                return res.status(404).json({
                    code: 404,
                    message: "No such user!"
                });
            }
            try {
                //original method
                let results = await cartModel.find(
                    {user_id:user_id},
                    {phone_id:1, user_id:1, number:1, _id:0}
                )
                if (results.length > 0) {
                    //perform request
                    for (let item in results) {
                        //find phone based on the phone id of the cart item
                        let phone_id = results[item].phone_id.toString();
                        let phone = await phoneModel.findById(phone_id);
                        //check number and stock
                        if (results[item].number > phone.stock) {
                            return res.status(403).json({
                                code: 403,
                                message: "Transaction failed! Number exceeds stock!",
                                data: {
                                    "phone_id": phone_id,
                                    "stock": phone.stock,
                                    "cart number": results[item].number
                                }
                            });
                        }
                        //update stock
                        await phone.updateOne({
                            stock: phone.stock - results[item].number
                        })
                        //clear cart
                        await cartModel.findOneAndDelete({
                            phone_id:phone_id, user_id:user_id
                        })
                    }

                    //check stock and update status
                    let result = await phoneModel.updateMany(
                        {stock:0},
                        {disabled:"true"}
                    )
                    console.log(result.modifiedCount + " phone in stock is disabled");

                    return res.status(200).json({
                        code: 200,
                        message: "Successful transaction!"
                    });
                } else {
                    return res.status(403).json({
                        code: 403,
                        message: "Cart is empty!"
                    });
                }
            } catch (err) {
                console.log("Transaction error: ", err);
                return res.status(500).json({
                    code: 500,
                    message: "Server error!"
                });
            }

            /*
            //callback function test
            cartModel.find(
                {user_id:user_id},
                {phone_id:1, user_id:1, number:1, _id:0},
                function (err, result) {
                    if (err) return res.send(500,{code: 500, message: "Server error!"});
                    if (result.length > 0) {
                        //perform request
                        return res.send(200,{code: 200, message:"Successful transaction!"})
                    } else {
                        return res.send(403,{code: 403, message: "Cart is empty!"});
                    }
                }
            );
             */

        } catch (err) {
            console.log("Error in confirm_transaction!", err);
        }
    }

    async test(req, res) {
        let reg = /^\d+(\.\d+)?$/;
        let regx = /^([1-9]\d{0,6}|0)(\.\d{1,2})?$/;
        let flag = req.query["match"];
        console.log("match: ", flag);
        console.log("test: ", regx.test(flag));
        return res.send(403,{
            code: 403,
            message:"Query failed!"
        });
    }

}

const cartController = new cart();
module.exports = cartController;