var express = require("express");
var router = express.Router();
const driverController = require("../controller/driverController");

router.post("/api_add_driver", driverController.api_add_driver);
router.post("/api_get_drivers/:supplierId", driverController.api_get_drivers);
router.post("/api_remove_driver", driverController.api_remove_driver);
router.post("/assign_transfer_task", driverController.assign_transfer_task);

module.exports = router;
