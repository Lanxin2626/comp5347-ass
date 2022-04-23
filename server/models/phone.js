const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const phoneSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            maxlength: 224,
        },
        brand: {
            type: String,
            maxlength: 32,
        },
        image: {
            type: String,
        },
        stock: {
            type: Number,
            min:0,
            maxlength: 100,
        },
        seller: {
            type: String,
            maxlength: 100,
        },
        price: {
            type: Number,
            min:0,
            maxlength: 100,
        },
        reviews: [
            {
                reviewer: { type: ObjectId, ref: "users" },
                rating: Number,
                comment: String,
            },
        ],
        disabled: {
            type: String,
            maxlength: 100,
            default: 'false',
            enum: ['true', 'false'],
        },
    },
    { timestamps: true }
);

phoneSchema.statics.findByTitle = function (title, callback) {
    return this
        .find({ title: { $regex: title, $options: 'i' } })//效率不高因为需要扫描所有手机 regex无法建立索引
        .select({ title: 1, brand: 1, image: 1, stock: 1, seller: 1, price: 1, reviews: 1, disabled: 1 })
        .exec(callback)
}

phoneSchema.statics.filterBrand = function (brand, callback) {
    return this
        .find({ brand: brand })
        .select({ title: 1, brand: 1, image: 1, stock: 1, seller: 1, price: 1, reviews: 1, disabled: 1 })
        .exec(callback)
}

phoneSchema.statics.rangeSelector = function (price, callback) {
    return this
        .find({ price: { $lt:price}})
        .select({ title: 1, brand: 1, image: 1, stock: 1, seller: 1, price: 1, reviews: 1, disabled: 1 })
        .exec(callback)
}
phoneSchema.statics.findSoldOut = function (callback) {
    return this
        .find ({stock:{$gt:0}},{disabled:null}).sort({stock: 1}).limit(5)
        .select({ title: 1, brand: 1, image: 1, stock: 1, seller: 1, price: 1, reviews: 1, disabled: 1 })
        .exec(callback)
}
//稍后做
phoneSchema.statics.bestSeller = function (callback) {
    return this
    //db.mycollection.aggregate([{$project: { count: { $size:"$foo" }}}])
        .find ({stock:{$gt:0}},{disabled:null}).sort({}).limit(5)
        .select({ title: 1, brand: 1, image: 1, stock: 1, seller: 1, price: 1, reviews: 1, disabled: 1 })
        .exec(callback)
}

const phoneModel = mongoose.model("phonelists", phoneSchema);
module.exports = phoneModel;
