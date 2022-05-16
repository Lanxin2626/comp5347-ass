const express = require("express");
const router = express.Router();
const cartController = require("../controller/cart");

// add to cart
router.post("/add_item", cartController.add_to_cart)

// modify item number
router.post("/edit_item", cartController.edit_item)

// query cart items
router.get("/get_items", cartController.query_cart)

// return a total number of cart items
router.get("/total", cartController.get_total)

// delete an item
router.post("/del_item", cartController.delete_item)

// confirm transaction
router.post("/checkout", cartController.confirm_transaction)


module.exports = router;


