import express from "express"
import { createProduct, getProduct, searchProducts } from "../controllers/productController.js";


const productRoute = express.Router();


productRoute.post('/', createProduct);
productRoute.get("/search/:query", searchProducts)
productRoute.get("/products_search", getProduct)

export default productRoute;