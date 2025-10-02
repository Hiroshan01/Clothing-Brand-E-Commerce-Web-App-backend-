import Order from "../models/order.js";
import Products from "../models/product.js";
import User from "../models/user.js";
import generateOrderEmailHTML from "../utils/emailService.js";
import dotenv from "dotenv";
dotenv.config();

// Generate unique order ID
async function generateOrderId() {
    const lastOrder = await Order.findOne().sort({ orderDate: -1 });

    if (!lastOrder) {
        return "ZIARA00001";
    }

    const lastOrderNumber = parseInt(lastOrder.orderId.replace("ZIARA", ""));
    const newOrderNumber = lastOrderNumber + 1;
    return "ZIARA" + String(newOrderNumber).padStart(5, '0');
}

async function validateAndFetchProducts(orderProducts) {
    const products = [];
    let total = 0;
    let labelTotal = 0;

    for (const orderItem of orderProducts) {
        console.log(`Looking up product: ${orderItem.productId}`);

        const product = await Products.findOne({ productId: orderItem.productId });

        if (!product) {
            console.error(`Product not found: ${orderItem.productId}`);
            throw new Error(`Product with ID ${orderItem.productId} not found`);
        }

        const productName = product.ProductName || product.productName || product.name || "Unknown Product";

        console.log(`Found product: ${productName}`);
        console.log(`Product fields:`, Object.keys(product.toObject ? product.toObject() : product));

        if (!product.isAvailable) {
            throw new Error(`Product "${productName}" is currently unavailable`);
        }

        if (orderItem.size && orderItem.size !== "N/A" && !product.size?.includes(orderItem.size)) {
            throw new Error(`Size "${orderItem.size}" not available for product "${productName}"`);
        }

        if (!orderItem.qty || orderItem.qty < 1) {
            throw new Error(`Invalid quantity for product "${productName}"`);
        }

        products.push({
            productInfo: {
                productId: product.productId,
                name: productName,
                altName: product.altName || "",
                size: orderItem.size || "N/A",
                description: product.description || "",
                image: product.images || [],
                price: product.price
            },
            quantity: orderItem.qty
        });

        total += product.price * orderItem.qty;
        labelTotal += (product.labelledPrice || product.price) * orderItem.qty;
    }

    return { products, total, labelTotal };
}

export async function createOrder(req, res) {
    try {
        // Debug logging
        console.log("=== Order Creation Debug ===");
        console.log("req.user:", req.user);
        console.log("req.body:", req.body);
        console.log("Authorization header:", req.headers.authorization);

        // Check authentication
        if (!req.user) {
            console.error("No user found in request");
            return res.status(403).json({
                message: "Please login to place an order. No authentication token found."
            });
        }

        console.log("User authenticated:", req.user.email);

        // Fetch user from database to get _id
        console.log("Fetching user from database...");
        const user = await User.findOne({ email: req.user.email });

        console.log("User query result:", user ? "Found" : "Not found");

        if (!user) {
            console.error("User not found in database:", req.user.email);
            console.error("Available user fields in token:", Object.keys(req.user));
            return res.status(403).json({
                message: "User not found. Please login again."
            });
        }

        console.log("User found in DB with _id:", user._id);
        console.log("User object:", {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        });

        const { products, name, address, phone } = req.body;

        // Validate products array
        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({
                message: "Order must contain at least one product"
            });
        }

        console.log("Products to order:", products);

        // Generate order ID
        const orderId = await generateOrderId();
        console.log("Generated order ID:", orderId);

        // Validate and fetch product details
        const { products: validatedProducts, total, labelTotal } =
            await validateAndFetchProducts(products);

        console.log("Validated products:", validatedProducts);

        // Prepare order data
        const orderData = {
            orderId,
            user: user._id, // Use the fetched user's _id
            email: user.email,
            name: name || `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email,
            address: address || "",
            phone: phone || "",
            products: validatedProducts,
            total,
            labelTotal,
            status: "pending"
        };

        console.log("Order data prepared:", JSON.stringify(orderData, null, 2));

        // Create and save order
        const order = new Order(orderData);
        const savedOrder = await order.save();

        console.log("Order saved successfully:", savedOrder.orderId);

        // Send order confirmation email (if you have email functionality)
        // Commented out since sendOrderConfirmationEmail is not defined

        try {
            generateOrderEmailHTML({
                email: savedOrder.email,
                name: savedOrder.name,
                orderId: savedOrder.orderId,
                orderDate: savedOrder.orderDate,
                products: savedOrder.products,
                total: savedOrder.total,
                address: savedOrder.address,
                phone: savedOrder.phone
            });
        } catch (emailError) {
            console.error("Failed to send confirmation email:", emailError);
        }


        res.status(201).json({
            message: "Order created successfully",
            order: savedOrder
        });

    } catch (error) {
        console.error("=== Order Creation Error ===");
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);

        res.status(500).json({
            message: error.message || "Failed to create order",
            error: process.env.NODE_ENV === 'development' ? error.toString() : undefined
        });
    }
}