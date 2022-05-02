const express = require("express");
const router = express.Router();
const cartController = require("../controller/cart");

// add to cart
router.post("/add_item", cartController.add_to_cart)

// modify item number
router.post("/edit_item", cartController.edit_item)

// query cart items
router.get("/get_items", cartController.query_cart)

// test method for query
router.get("/test_get_items", cartController.test_query_cart)

// delete an item
router.post("/del_item", cartController.delete_item)

// confirm transaction
router.post("/checkout", cartController.confirm_transaction)

router.get("/test", cartController.test)

module.exports = router;


