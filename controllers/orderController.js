import Order from "../models/order.js";
import Products from "../models/product.js";
import User from "../models/user.js";
import { sendOrderConfirmationEmail } from "../utils/emailService.js";
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

        const product = await Products.findOne({ productId: orderItem.productId });

        if (!product) {
            throw new Error(`Product with ID ${orderItem.productId} not found`);
        }

        const productName = product.ProductName || product.productName || product.name || "Unknown Product";


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

        // Check authentication
        if (!req.user) {
            return res.status(403).json({
                message: "Please login to place an order. No authentication."
            });
        }
        // Fetch user from database to get _id
        const user = await User.findOne({ email: req.user.email });

        if (!user) {
            return res.status(403).json({
                message: "User not found. Please login again."
            });
        }

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

        // Generate order ID
        const orderId = await generateOrderId();

        const { products: validatedProducts, total, labelTotal } =
            await validateAndFetchProducts(products);


        const orderData = {
            orderId,
            user: user._id,
            email: user.email,
            name: name || `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email,
            address: address || "",
            phone: phone || "",
            products: validatedProducts,
            total,
            labelTotal,
            status: "pending"
        };

        const order = new Order(orderData);
        const savedOrder = await order.save();


        try {
            await sendOrderConfirmationEmail({
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
        res.status(500).json({
            message: error.message || "Failed to create order",
            error: process.env.NODE_ENV === 'development' ? error.toString() : undefined
        });
    }
}