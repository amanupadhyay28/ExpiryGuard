const Supplier = require("../models/supplier");
const TransferTask = require("../models/tranferTask");

const api_add_driver = async (req, res) => {
  try {
    const {
      supplierEmail,
      driverName,
      phoneNumber,
      vehicleNumber,
      driverEmail,
      serviceArea,
      vehicleType,
    } = req.body;

    const supplier = await Supplier.findOne({ email: supplierEmail });
    if (!supplier) {
      return res.status(400).json({ msg: "Supplier not found" });
    }

    const driverId = `DRV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newDriver = {
      driverId,
      driverName,
      phoneNumber,
      vehicleNumber,
      driverEmail,
      serviceArea,
      vehicleType,
    };

    supplier.drivers.push(newDriver);
    await supplier.save();

    res.json({ msg: "Driver added successfully", driver: newDriver });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const api_get_drivers = async (req, res) => {
  try {
    const { supplierEmail } = req.body;

    const supplier = await Supplier.findOne({ email: supplierEmail });
    if (!supplier) {
      return res.status(400).json({ msg: "Supplier not found" });
    }

    res.json(supplier.drivers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const api_remove_driver = async (req, res) => {
  try {
    const { supplierId, driverId } = req.body;

    const supplier = await Supplier.findOne({ supplierId });
    if (!supplier) {
      return res.status(400).json({ msg: "Supplier not found" });
    }

    supplier.drivers = supplier.drivers.filter(
      (driver) => driver.driverId !== driverId
    );
    await supplier.save();

    res.json({ msg: "Driver removed successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const assign_transfer_task = async (req, res) => {
  try {
    const {
      sourceRetailerEmail,
      targetRetailerEmail,
      products,
      supplierId,
      driverId,
    } = req.body;

    const supplier = await Supplier.findOne({ supplierId });
    if (!supplier) {
      return res.status(400).json({ msg: "Supplier not found" });
    }

    const driver = supplier.drivers.find(
      (driver) => driver.driverId === driverId
    );
    if (!driver) {
      return res.status(400).json({ msg: "Driver not found" });
    }

    const taskId = `TASK-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newTask = new TransferTask({
      taskId,
      sourceRetailerEmail,
      targetRetailerEmail,
      products,
      driverId,
      status: "pending",
    });

    await newTask.save();

    res.json({ msg: "Transfer task assigned successfully", task: newTask });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  api_add_driver,
  api_get_drivers,
  api_remove_driver,
  assign_transfer_task,
};
