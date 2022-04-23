const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const cartSchema = new mongoose.Schema(
    {
        user_id: {
            type: ObjectId,
            ref: "users",
            required: true,
            maxlength: 25,
        },
        phone_id: {
            type: ObjectId,
            ref: "phonelists",
            required: true,
            maxlength: 25,
        },
        number: {
            type: Number,
            required: true,
            min:0,
        },
        money: {
            type: Number,
            min:0,
            required: true,
        }
    },
);

const cartModel = mongoose.model("cart", cartSchema);
module.exports = cartModel;
