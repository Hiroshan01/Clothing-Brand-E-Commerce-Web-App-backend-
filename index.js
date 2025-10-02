import express from 'express'
import connectDB from './config/configDB.js';
import jwt from "jsonwebtoken"
import cors from "cors"
import dotenv from "dotenv";
import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import orderRoute from './routes/orderRoute.js';

dotenv.config()

let app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

// JWT middleware
app.use(
    (req, res, next) => {
        const tokenString = req.header("Authorization")
        if (tokenString != null) {
            const token = tokenString.replace("Bearer ", "")

            jwt.verify(token, process.env.JWT_KEY,
                (err, decoded) => {
                    if (decoded != null) {
                        req.user = decoded
                        next()
                    } else {
                        console.log("Invalid token:", err.message);
                        res.status(403).json({
                            message: "Invalid Token "
                        })
                    }
                }
            )

        } else {
            next()
        }

    }
)

//Routers
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use("/api/orders", orderRoute)

app.listen(5000, () => {
    console.log("Server is running on 5000")
})