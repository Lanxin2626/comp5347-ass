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

//range selector
router.get('/changeUrl',phoneController.changeUrl);

//find top 5 sold out soon phone product 前端无需判断disabled情况
router.get('/findSoldOut',phoneController.findSoldOut);

//find top 5 best seller with highest average rating 前端无需判断disabled情况
router.get('/bestSeller',phoneController.bestSeller);

module.exports = router;