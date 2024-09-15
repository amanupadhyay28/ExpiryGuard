var express = require("express");
var router = express.Router();
const inventoryController = require("../controller/inventoryController");
const authRetailer = require("../middleware/authRetailer");

router.post(
  "/api_add_product",
  authRetailer,
  inventoryController.api_add_product
);

module.exports = router;
