// server/controller/auth.controller
import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config()

export const signIn = async (req, res) => {
    const { email, password } = req.body;
    console.log("auth-controller Reached");
    try {
        const user = await User.findOne({ email });
        console.log("signin Reached -auth.controller");
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!user || !passwordsMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign(
            {
                userId: user._id,
                userEmail: user.email,
            },
            process.env.SECRET_KEY,
            { expiresIn: "10s" }
        )
        const jwtDecoded = jwt.decode( token )
        console.log(jwtDecoded)
        // Send the response back to the client with the token
        return res.status(200).json({ success: true, user, jwtDecoded});
    } catch (error) {
        console.error("Error signing in:", error);
        // Handle errors and send an appropriate response
        return res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
};
