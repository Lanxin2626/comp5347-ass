const mongoose = require("mongoose");

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
            maxlength: 100,
        },
        seller: {
            type: String,
            maxlength: 100,
        },
        price: {
            type: Number,
            maxlength: 100,
        },
        reviews: {
            type: [Object],
            maxlength: 100,
        },
        disabled: {
            type: String,
            maxlength: 100,
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

phoneSchema.statics.getBrands = function (callback) {
    return this
        .find({})
        .select({brand: 1})
        .exec(callback)
}

phoneSchema.statics.rangeSelector = function (price, callback) {
    return this
        .find({ price: { $lt:price}})
        .select({ title: 1, brand: 1, image: 1, stock: 1, seller: 1, price: 1, reviews: 1, disabled: 1 })
        .exec(callback)
}


const phoneModel = mongoose.model("phonelists", phoneSchema);
module.exports = phoneModel;
