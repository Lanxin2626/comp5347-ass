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
router.get('/range',phoneController.rangeSelector)

module.exports = router;