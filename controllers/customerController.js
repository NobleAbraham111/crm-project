const Customer = require("../models/customerModel");


exports.getCustomers = async (req, res) => {
    try {
        const { name, email, location, page = 1, limit = 10 } = req.query;
        let filter = {};
        if (name) filter.name = new RegExp(name, "i");
        if (email) filter.email = email;
        if (location) filter.location = location;

        const customers = await Customer.find(filter)
            .limit(limit * 1)
            .skip((page - 1) * limit);

        res.status(200).json({ success: true, data: customers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


exports.createCustomer = async (req, res) => {
    try {
        const customer = new Customer(req.body);
        await customer.save();
        res.status(201).json({ success: true, data: customer });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


exports.updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!customer) return res.status(404).json({ success: false, message: "Customer not found" });

        res.status(200).json({ success: true, data: customer });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


exports.deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) return res.status(404).json({ success: false, message: "Customer not found" });

        res.status(200).json({ success: true, message: "Customer deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
