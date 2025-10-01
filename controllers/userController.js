import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config()

//register user
export function createUser(req, res) {
    //check admin
    if (req.body.role == "admin") {
        if (req.user != null) {
            if (req.user.role != "admin") {
                res.status(403).json({
                    message: "You are not authorized to create admin account"
                })
                return
            }

        } else {
            res.status(403).json({
                message: "You are not authorized to create an admin please login first"
            })
            return
        }
    }
    const hashPassword = bcrypt.hashSync(req.body.password, 10)
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPassword,
        role: req.body.role || "customer",
    })
    user.save().then(
        () => {
            res.json({
                message: "User created successfully"
            })
        }
    ).catch(
        (error) => {
            res.status(500).json({
                message: "Fail User creation",
                error: error.message
            })
        }
    )

}

//login user
export function userLogin(req, res) {
    const email = req.body.email
    const password = req.body.password

    User.findOne({ email: email }).then(
        (user) => {
            if (user == null) {
                res.status(403).json({
                    message: "User not found"
                })
            } else {
                const isPasswordCorrect = bcrypt.compareSync(password, user.password) //compare
                if (isPasswordCorrect) {
                    // Generate encrypt
                    const token = jwt.sign(
                        {
                            email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            role: user.role,
                            img: user.img
                        },
                        process.env.JWT_KEY
                    )
                    res.json({
                        message: "Login successful",
                        token: token,
                        role: user.role
                    })
                } else {
                    res.status(401).json({
                        message: "Invalid password"
                    })
                }
            }
        }
    )

}

//get user
export async function getUser(req, res) {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch {
        res.status(500).json(
            {
                message: "User Not Found",
            }
        );
    }
}

//get user by id 
export async function getUserById(req, res) {
    const id = req.params._id;

    try {
        const user = await User.findOne({ _id: id, isBlock: false });
        if (!user) {
            return res.status(404).json({ message: "User not found or is blocked" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}