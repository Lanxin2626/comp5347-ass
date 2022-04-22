const express = require("express");
const router = express.Router();
const userOpController = require("../controller/user_op");

// get user's profile
router.get("/profile", userOpController.get_profile)

// edit user's profile
router.post("/edit_profile", userOpController.edit_profile)

// change user's password
router.post("/edit_password", userOpController.change_password)

// get listings
router.get("/listing", userOpController.get_listing)

// add a listing
router.post("/add_listing", userOpController.add_listing)

// remove a listing
router.post("/del_listing", userOpController.remove_listing)

// enable/disable a listing
router.post("/listing_op", userOpController.listing_operation)

// get comments
router.get("/comments", userOpController.get_comments)

module.exports = router;


