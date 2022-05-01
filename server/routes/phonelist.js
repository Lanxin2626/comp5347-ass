const express = require("express");
const router = express.Router();
const phoneController = require("../controller/phonelist");

//search phone keyword
router.get('/search',phoneController.searchPhone);

//filter brand
router.get('/filter',phoneController.filterBrand);

//get all brand for dropdown selection
router.get('/brand',phoneController.allBrand);

//range selector
router.get('/range',phoneController.rangeSelector);

//search, filter, range work together(3个一起作用)
router.get('/searchPhoneList',phoneController.searchPhoneList);

//change phone Uri
router.get('/changeUrl',phoneController.changeUrl);

//find top 5 sold out soon phone product 
router.get('/findSoldOut',phoneController.findSoldOut);

//find top 5 best seller with highest average rating 
router.get('/bestSeller',phoneController.bestSeller);

//find speciic phone according to id
router.get('/findOne',phoneController.findOne);

//comment on a phone
router.post('/comment',phoneController.comment);

module.exports = router;