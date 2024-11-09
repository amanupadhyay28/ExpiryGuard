const Supplier = require("../models/supplier");
const Inventory = require("../models/inventory");
const Retailer = require("../models/retailer");
const ProductRequest = require("../models/productRequest");

// Helper function to format a date to 'YYYY-MM-DD'
const formatDateToYYYYMMDD = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const api_add_product = async (req, res) => {
  try {
    const {
      productName,
      description,
      quantity,
      price,
      batchNumber,
      manufactureDate,
      expiryDate,
      supplierEmail,
      supplierName,
      retailerEmail,
    } = req.body;

    // Format dates to 'YYYY-MM-DD'
    const formattedManufactureDate = formatDateToYYYYMMDD(manufactureDate);
    const formattedExpiryDate = formatDateToYYYYMMDD(expiryDate);

    // Find the inventory for the retailer
    let inventory = await Inventory.findOne({ retailerEmail });

    if (!inventory) {
      // If no inventory exists for the retailer, create one
      inventory = new Inventory({ retailerEmail, products: [] });
    }

    // Find an existing product in the inventory
    const existingProduct = inventory.products.find(
      (product) =>
        product.productName === productName &&
        product.manufactureDate === formattedManufactureDate &&
        product.expiryDate === formattedExpiryDate &&
        product.price === price
    );

    if (existingProduct) {
      // If the product exists, update its quantity
      existingProduct.quantity += quantity;
    } else {
      // If the product does not exist, generate a unique productId and add the new product to the inventory
      const productId = `PROD-${Date.now()}-${Math.floor(
        Math.random() * 1000
      )}`;

      inventory.products.push({
        productId,
        productName,
        description,
        quantity,
        price,
        batchNumber,
        manufactureDate: formattedManufactureDate, // Store in 'YYYY-MM-DD' format
        expiryDate: formattedExpiryDate, // Store in 'YYYY-MM-DD' format
        supplierEmail,
        supplierName,
      });
    }

    // Save the updated inventory
    await inventory.save();

    res.json({ msg: "Product added successfully" });
  } catch (err) {
    console.error(err.message);
    if (err.code === 11000) {
      return res.status(400).json({ msg: "Duplicate product ID" });
    }
    res.status(500).send("Server Error");
  }
};

const api_update_quantity = async (req, res) => {
  try {
    const {
      productName,
      quantitySold,
      price,
      manufactureDate,
      expiryDate,
      retailerEmail,
    } = req.body;

    // Format dates to 'YYYY-MM-DD'
    const formattedManufactureDate = formatDateToYYYYMMDD(manufactureDate);
    const formattedExpiryDate = formatDateToYYYYMMDD(expiryDate);

    // Find the inventory for the retailer
    let inventory = await Inventory.findOne({ retailerEmail });

    if (!inventory) {
      return res
        .status(404)
        .json({ msg: "Inventory not found for the retailer" });
    }

    // Find products matching the criteria
    const productsToUpdate = inventory.products.filter(
      (product) =>
        product.productName === productName &&
        product.price === price &&
        product.manufactureDate === formattedManufactureDate &&
        product.expiryDate === formattedExpiryDate
    );

    if (productsToUpdate.length === 0) {
      return res
        .status(404)
        .json({ msg: "No matching product found in inventory" });
    }

    // Check if there's enough quantity in the first matching product
    let productUpdated = false;
    for (let product of productsToUpdate) {
      if (product.quantity >= quantitySold) {
        // Update the quantity
        product.quantity -= quantitySold;
        productUpdated = true;
        break;
      }
    }

    if (!productUpdated) {
      return res.status(400).json({ msg: "Not enough quantity available" });
    }

    // Save the updated inventory
    await inventory.save();

    res.json({ msg: "Product quantity updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const api_getRetailersForSupplier = async (req, res) => {
  try {
    const { supplierEmail } = req.body;

    if (!supplierEmail) {
      return res.status(400).send("Supplier email is required");
    }

    // Find inventories containing products from the given supplier
    const inventories = await Inventory.find({
      "products.supplierEmail": supplierEmail,
    });

    // Extract unique retailer emails
    const retailerEmails = [
      ...new Set(inventories.map((inventory) => inventory.retailerEmail)),
    ];

    // Fetch detailed retailer information using the extracted emails
    const retailers = await Retailer.find({ email: { $in: retailerEmails } });

    res.json(retailers);
    // console.log(retailers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const api_getSuppliersForRetailer = async (req, res) => {
  try {
    const { retailerEmail } = req.body;
    // console.log(retailerEmail);

    if (!supplierEmail) {
      return res.status(400).json({ error: "Supplier email is required" });
    }
    const inventories = await Inventory.find({ retailerEmail });
    const supplierEmails = [
      ...new Set(
        inventories
          .map((inventory) =>
            inventory.products.map((product) => product.supplierEmail)
          )
          .flat()
      ),
    ];
    const suppliers = await Supplier.find({ email: { $in: supplierEmails } });

    res.json(suppliers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const api_getExpiringProducts = async (req, res) => {
  try {
    const { retailerEmail, supplierEmail, days } = req.body;

    if (!retailerEmail || !supplierEmail || !days) {
      return res
        .status(400)
        .send(
          "Retailer email, supplier email, and number of days are required"
        );
    }

    const currentDate = new Date();
    const thresholdDate = new Date();
    thresholdDate.setDate(currentDate.getDate() + parseInt(days, 10));

    // Format the threshold date to 'YYYY-MM-DD'
    const formattedThresholdDate = formatDateToYYYYMMDD(thresholdDate);

    const inventory = await Inventory.findOne({ retailerEmail });

    if (!inventory) {
      return res
        .status(404)
        .json({ msg: "Inventory not found for the retailer" });
    }

    const expiringProducts = inventory.products.filter((product) => {
      const formattedExpiryDate = formatDateToYYYYMMDD(product.expiryDate);

      return (
        product.supplierEmail === supplierEmail &&
        formattedExpiryDate <= formattedThresholdDate
      );
    });

    res.json(expiringProducts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const api_getInventory = async (req, res) => {
  try {
    const { retailerEmail } = req.body;
    const inventory = await Inventory.findOne({ retailerEmail });
    if (!inventory) {
      return res.status(404).json({ msg: "Inventory not found" });
    }
    res.json(inventory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const api_getInventoryForRetailerBySupplier = async (req, res) => {
  try {
    const { retailerEmail, supplierEmail } = req.body;
    const inventory = await Inventory.findOne({ retailerEmail });

    if (!inventory) {
      return res.status(404).json({ msg: "Inventory not found" });
    }
    const supplierProducts = inventory.products.filter(
      (product) => product.supplierEmail === supplierEmail
    );

    res.json(supplierProducts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const api_productRequests = async (req, res) => {
  try {
    const {
      productName,
      price,
      quantity,
      supplierEmail,
      retailerEmail,
      expiryDate,
      reqType,
    } = req.body;

    const requestId = `REQ-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const newProductRequest = new ProductRequest({
      requestId,
      productName,
      price,
      quantity,
      supplierEmail,
      retailerEmail,
      expiryDate,
      reqType,
    });
    const savedProductRequest = await newProductRequest.save();
    res.status(201).json(savedProductRequest);
  } catch (error) {
    console.error("Error saving product request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const api_SeeProductRequests = async (req, res) => {
  try {
    const { supplierEmail } = req.body;
    console.log(supplierEmail);
    const productRequests = await ProductRequest.find({
      supplierEmail: supplierEmail,
    });
    res.json(productRequests);
  } catch (error) {
    console.error("Error Fetching Product Request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = {
  api_add_product,
  api_update_quantity,
  api_getRetailersForSupplier,
  api_getSuppliersForRetailer,
  api_getExpiringProducts,
  api_getInventory,
  api_getInventoryForRetailerBySupplier,
  api_productRequests,
  api_SeeProductRequests,
};
