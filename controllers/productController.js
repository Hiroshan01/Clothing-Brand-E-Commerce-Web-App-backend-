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

        res.status(200).json(products);
    } catch (err) {
        console.error('Search error:', err);
        res.status(500).json({
            message: "Failed to search products",
            error: err.message
        });
    }
}
//Filter
export async function getProduct(req, res) {
    try {
        const resPerPage = Number(req.query.limit) || 4;
        const totalProducts = await Product.countDocuments();
        const apiFilters = new APIFilters(Product.find(), req.query);

        apiFilters.filters();

        const filteredQuery = apiFilters.query.clone();
        const filterProductCount = await filteredQuery.countDocuments();

        apiFilters.pagination(resPerPage);

        const products = await apiFilters.query;
        res.status(200).json({
            success: true,
            resPerPage,
            filterProductCount,
            totalProducts,
            currentPage: Number(req.query.page) || 1,
            totalPages: Math.ceil(filterProductCount / resPerPage),
            products,
        });

    } catch (error) {
        console.error("Error in getProduct:", error);
        res.status(500).json({
            success: false,
            message: "Products load කරන්න බැහැ",
            error: error.message
        });
    }
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

//get product by ID 
export async function getProductById(req, res) {
    const productId = req.params.productId;
    try {
        const product = await Product.findOne({ productId: productId });

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        if (product.isAvailable) {
            res.json(product);
        } else {
            res.status(404).json({
                message: "Product not found or not available"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Failed to get product",
            error: err
        });
    }
}
