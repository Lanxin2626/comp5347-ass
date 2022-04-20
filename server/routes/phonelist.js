const express = require("express");
const router = express.Router();
const phoneController = require("../controller/phonelist");

//search phone keyword
router.get('/search',phoneController.searchPhone);

//filter brand
router.get('/filter',phoneController.filterBrand);

module.exports = router;