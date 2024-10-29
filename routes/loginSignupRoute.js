var express = require("express");
var router = express.Router();
var session = require("express-session");
var cookieParser = require("cookie-parser");
const loginSignupController = require("../controller/loginSignupController");

// Session configuration
const oneDay = 1000 * 60 * 60 * 24;
router.use(
  session({
    secret: process.env.SECRET_KEY,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);
router.use(cookieParser());


router.post(
  "/api_supplier_registration",
  loginSignupController.api_supplier_registration
);
router.post("/api_supplier_login", loginSignupController.api_supplier_login);
router.post(
  "/api_retailer_registration",
  loginSignupController.api_retailer_registration
);
router.post("/api_retailer_login", loginSignupController.api_retailer_login);

module.exports = router;
