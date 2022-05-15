const express = require("express");
const router = express.Router();
const userOpController = require("../controller/user_op");
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/static/phone_default_images/')
    },
    filename: function (req, file, cb) {
        let {brand} = req.body;
        cb(null, brand + '.' + file.mimetype.toString().split('/')[1])
    }
})

const upload = multer({ storage: storage })


// get user's profile
router.get("/profile", userOpController.get_profile)

// edit user's profile
router.post("/edit_profile", userOpController.edit_profile)

// change user's password
router.post("/edit_password", userOpController.change_password)

// get listings
router.get("/listing", userOpController.get_listing)

// remove a listing
router.post("/del_listing", userOpController.remove_listing)

// enable/disable a listing
router.post("/listing_op", userOpController.listing_operation)

// get comments
router.get("/comments", userOpController.get_comments)

// add a listing with a file
router.post("/add_listing", upload.single("image"), userOpController.add_listing_with_file)


module.exports = router;


