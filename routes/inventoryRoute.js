var express = require("express");
var router = express.Router();
const inventoryController = require("../controller/inventoryController");
const authRetailer = require("../middleware/authRetailer");

router.post(
  "/api_add_product",
  authRetailer,
  inventoryController.api_add_product
);
router.post(
  "/api_update_quantity",
  authRetailer,
  inventoryController.api_update_quantity
);

module.exports = router;
