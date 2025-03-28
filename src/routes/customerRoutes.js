const express = require("express");
const { getCustomers, createCustomer, updateCustomer, deleteCustomer } = require("../controllers/customerController");

const router = express.Router();




router.get("/", getCustomers);
router.post("/", createCustomer);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

module.exports = router;
