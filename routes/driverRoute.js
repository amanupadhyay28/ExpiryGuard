var express = require("express");
var router = express.Router();
const driverController = require("../controller/driverController");

router.post("/api_add_driver", driverController.api_add_driver);
router.post("/api_get_drivers/", driverController.api_get_drivers);
router.post("/api_remove_driver", driverController.api_remove_driver);
router.post("/assign_transfer_task", driverController.assign_transfer_task);
router.get(
  "/api_update_task_status/:taskId",
  driverController.api_update_task_status
);
router.post(
  "/api_get_tranferTask_data",
  driverController.api_get_tranferTask_data
);
router.post(
  "/api_get_savedProductsData",
  driverController.api_get_savedProductsData
);

module.exports = router;
