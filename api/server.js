const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors")
const logger = require("morgan")

// Routes
const categoryRoute = require("./routes/categories");
const productRoute = require("./routes/products");
const billRoute = require("./routes/bills");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to mongoDB");
    } catch (error) {
        throw error
    }
}

// middlewares
app.use(logger("dev"))
app.use(express.json());
app.use(cors());

app.use("/api/categories", categoryRoute);
app.use("/api/products", productRoute);
app.use("/api/bills", billRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.listen(port, () => {
    connect();
    console.log(`Example app listening on port ${port}`);
})