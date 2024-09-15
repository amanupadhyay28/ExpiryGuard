const Inventory = require("../models/inventory");

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

module.exports = {
  api_add_product,
  api_update_quantity,
};
