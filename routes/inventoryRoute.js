var express = require("express");
var router = express.Router();
const inventoryController = require("../controller/inventoryController");
const authRetailer = require("../middleware/authRetailer");
const authSupplier = require("../middleware/authSupplier");

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
router.post(
  "/api_getRetailersForSupplier",
  authSupplier,
  inventoryController.api_getRetailersForSupplier
);
router.post(
  "/api_getSuppliersForRetailer",
  authRetailer,
  inventoryController.api_getSuppliersForRetailer
);
router.post(
  "/api_getExpiringProducts",
  inventoryController.api_getExpiringProducts
);
router.post("/api_getInventory", inventoryController.api_getInventory);

router.post(
  "/api_getInventoryForRetailerBySupplier",
  inventoryController.api_getInventoryForRetailerBySupplier
);

module.exports = router;
