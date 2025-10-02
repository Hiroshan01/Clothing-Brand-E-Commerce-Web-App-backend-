import mongoose from 'mongoose';
const orderSchema = mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false,
        default: ""
    },
    address: {
        type: String,
        required: false,
        default: ""
    },
    status: {
        type: String,
        required: true,
        default: "pending",
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
    },
    products: [{
        productInfo: {
            productId: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            altName: {
                type: String
            },
            size: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            image: [{
                type: String
            }],
            price: {
                type: Number,
                required: true
            }
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    total: {
        type: Number,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Order = mongoose.model("orders", orderSchema);
export default Order;