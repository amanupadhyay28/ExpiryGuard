var express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Supplier = require("../models/Supplier");
const Retailer = require("../models/retailer");

const api_supplier_registration = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phoneNumber,
      street,
      city,
      state,
      postalCode,
      country,
    } = req.body;

    const existingSupplier = await Supplier.findOne({ email: email });
    if (existingSupplier) {
      return res.status(400).json({ msg: "Supplier already exists" });
    }

    const supplierId = `SUP-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newSupplier = new Supplier({
      supplierId,
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address: {
        street,
        city,
        state,
        postalCode,
        country,
      },
    });

    await newSupplier.save();
    res.json({ msg: "Supplier registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const api_supplier_login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const supplier = await Supplier.findOne({ email });
    if (!supplier) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, supplier.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
    const payload = {
      supplier: {
        id: supplier.id,
      },
    };
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const api_get_suppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find({}, "supplierId name");
    res.json(suppliers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const api_retailer_registration = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phoneNumber,
      street,
      city,
      state,
      postalCode,
      country,
    } = req.body;

    const existingRetailer = await Retailer.findOne({ email: email });
    if (existingRetailer) {
      return res.status(400).json({ msg: "Retailer already exists" });
    }

    const retailerId = `RET-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newRetailer = new Retailer({
      retailerId,
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address: {
        street,
        city,
        state,
        postalCode,
        country,
      },
    });

    await newRetailer.save();
    res.json({ msg: "Retailer registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const api_retailer_login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const retailer = await Retailer.findOne({ email });
    if (!retailer) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, retailer.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
    const payload = {
      retailer: {
        id: retailer.id,
      },
    };
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  api_supplier_registration,
  api_supplier_login,
  api_get_suppliers,
  api_retailer_registration,
  api_retailer_login,
};
