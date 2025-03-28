
require("dotenv").config({ path: "./src/.env" });

console.log("MONGO_URI:", process.env.MONGO_URI); 
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const customerRoutes = require("./routes/customerRoutes");
const logger = require("./middlewares/logger");

const app = express();


app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(logger);


app.get("/", (req, res) => {
  res.send("CRM API is running...");
});
app.use("/api/customers", customerRoutes);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => console.error(" MongoDB connection error:", err));


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(` Server is running on http://localhost:${PORT}`));
