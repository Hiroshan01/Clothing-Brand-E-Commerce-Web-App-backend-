import Product from "../models/product.js";
import APIFilters from "../utils/apiFilter.js";
import { isAdmin } from "../utils/roleCheck.js";



export async function createProduct(req, res) {
    // Check if user is admin only
    if (!isAdmin(req)) {
        res.status(403).json({
            message: "You are not authorized to add product. Admin access required."
        });
        return;
    }

    const productData = req.body;
    productData.createdBy = 'admin';

    const product = new Product(productData);

    try {
        await product.save();
        res.json({
            message: "Product created successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "Product not created",
            error: err
        });
    }
}

//sesrch Query
export async function searchProducts(req, res) {
    const searchQuery = req.params.query;

    try {
        if (!searchQuery || searchQuery.trim() === '') {
            return res.status(400).json({
                message: "Search query is required"
            });
        }

        const products = await Product.find({
            $and: [
                { isAvailable: true },
                {
                    $or: [
                        { name: { $regex: searchQuery, $options: 'i' } },
                        { description: { $regex: searchQuery, $options: 'i' } }
                    ]
                }
            ]
        });

        res.json(products);
    } catch (err) {
        console.error('Search error:', err);
        res.status(500).json({
            message: "Failed to search products",
            error: err.message
        });
    }
}


export async function getProduct(req, res) {

    const resPerPage = 4
    const apiFilters = new APIFilters(Product, req.query).search().filters();

    let product = await apiFilters.query;
    let filterProductCount = product.length

    // return next (new ErrorHandler("Hello",400))

    apiFilters.pagination(resPerPage)
    product = await apiFilters.query.clone()

    res.status(200).json({
        resPerPage,
        filterProductCount,
        product,
    })
}

// Get Products for User (only available products)
export async function getUserProducts(req, res) {
    try {
        const products = await Product.find({ isAvailable: true });
        res.json(products);
    } catch (err) {
        res.status(500).json({
            message: "Failed to get products",
            error: err
        });
    }
}