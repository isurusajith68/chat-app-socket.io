import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt

        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        if (!verified) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        const user = await User.findById(verified.userId);
        
        if (!user) {
            return res.status(401).json({ error: "Unauthorized - User not found" });
        }

        req.user = user;

        next();

    } catch (error) {
        console.log("Error in protectedRoute middleware", error.message)
        res.status(500).json({ error: error.message });
    }
}

export default protectedRoute;