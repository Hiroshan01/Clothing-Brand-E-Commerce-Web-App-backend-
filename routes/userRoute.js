import express from "express"
import { createUser, getUser, userLogin } from "../controllers/userController.js";

const userRoute = express.Router();


userRoute.post('/', createUser)
userRoute.post("/login", userLogin)
userRoute.get("/profile", getUser)

export default userRoute;