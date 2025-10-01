import express from "express"
import { createUser, getUserProfile, userLogin } from "../controllers/userController.js";

const userRoute = express.Router();


userRoute.post('/', createUser)
userRoute.post("/login", userLogin)
userRoute.get("/profile", getUserProfile)

export default userRoute;