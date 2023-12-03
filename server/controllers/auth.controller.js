//server/controller/auth.controller
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
        );

        res.status(200).json({ success: true, user, token });
    } catch (error) {
        console.error("Error signing in:", error);
        res.status(500).json({
            success: false,
            error: "x1Internal Server Error",
        });
    }
};
