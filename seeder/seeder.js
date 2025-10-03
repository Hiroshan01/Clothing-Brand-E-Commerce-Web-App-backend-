import mongoose from "mongoose";
import product from "../models/product.js";

import dotenv from "dotenv";
import products from "./data.js";
dotenv.config();

const MONGO_URI = process.env.DB_URI;

async function seedProducts() {
    try {
        await mongoose.connect(MONGO_URI)

        await product.deleteMany();
        console.log("==== Products are Deleted =====");

        await product.insertMany(products)
        console.log("==== Products are added ====");

        process.exit()

    } catch (error) {
        console.log(error.message)
        process.exit();
    }
}

seedProducts()

//run "npm run seed"
