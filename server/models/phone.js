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
            min: 0,
            maxlength: 100,
        },
        seller: {
            type: String,
            ref:"users"
        },
        price: {
            type: Number,
            min: 0,
            maxlength: 100,
        },
        reviews: [
            {
                reviewer: {  type: mongoose.Schema.Types.ObjectId,ref:"users" },
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
        .find({ title: { $regex: title, $options: 'i' }, disabled: { $exists: false } })//效率不高因为需要扫描所有手机 regex无法建立索引
        .select({ title: 1, brand: 1, image: 1, stock: 1, seller: 1, price: 1, reviews: 1, disabled: 1 })
        .exec(callback)
}

phoneSchema.statics.filterBrand = function (brand, callback) {
    return this
        .find({ brand: brand, disabled: { $exists: false } })
        .select({ title: 1, brand: 1, image: 1, stock: 1, seller: 1, price: 1, reviews: 1, disabled: 1 })
        .exec(callback)
}

phoneSchema.statics.rangeSelector = function (price, callback) {
    return this
        .find({ price: { $lt: price }, disabled: { $exists: false } })
        .select({ title: 1, brand: 1, image: 1, stock: 1, seller: 1, price: 1, reviews: 1, disabled: 1 })
        .exec(callback)
}

//同时filter brand, price, title
phoneSchema.statics.searchPhoneList = function (param, callback) {
    var query = {};
    
    query.disabled = { $exists: false };
    if (param.title) {
        query.title = new RegExp(param.title, "i");
    }
    if (param.brand&&param.brand != "All") {
        query.brand = param.brand;
    }
    if (param.price) {
        query.price = { $lte: param.price };
    }

    return this
        .find(query)
        .select({ title: 1, brand: 1, image: 1, stock: 1, seller: 1, price: 1, reviews: 1, disabled: 1 })
        .exec(callback)
}

phoneSchema.statics.findSoldOut = function (callback) {
    return this
        .find({ stock: { $gt: 0 } }, { disabled: null }).sort({ stock: 1 }).limit(5)
        .select({ title: 1, brand: 1, image: 1, stock: 1, seller: 1, price: 1, reviews: 1, disabled: 1 })
        .exec(callback)
}

phoneSchema.statics.bestSeller = function (callback) {
    return this
        .aggregate([
            { $match: { disabled: { $exists: false }, "reviews.1": { $exists: 1 } } },//{'name.1': {$exists: true}}
            { $addFields: { avgRating: { $avg: "$reviews.rating" } } },
            { $project: { title: 1, brand: 1, image: 1, stock: 1, seller: 1, price: 1, reviews: 1, disabled: 1, avgRating: 1 } },
            { $sort: { avgRating: -1 } },
            { $limit: 5 }
        ]).exec(callback);
}

phoneSchema.statics.findPhone = function (id,callback) {
    return this
    .find({_id:id})
    .populate('seller','firstname lastname')
    .populate('reviews.reviewer','firstname lastname')
    .select({ title: 1, brand: 1, image: 1, stock: 1, seller: 1, price: 1, reviews: 1, disabled: 1 })
    .exec(callback)

}

phoneSchema.statics.findByTitleAndBrand = function (title, brand, callback) {
    return this
        .find({ title: { $regex: title, $options: 'i' }, brand: brand, disabled: { $exists: false } })
        .select({ title: 1, brand: 1, image: 1, stock: 1, seller: 1, price: 1, reviews: 1, disabled: 1 })
        .exec(callback)
}

const phoneModel = mongoose.model("phonelists", phoneSchema);//第一个参数跟数据库表名无关
module.exports = phoneModel;