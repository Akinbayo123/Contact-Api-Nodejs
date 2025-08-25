import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

export const validateToken = asyncHandler(async(req, res, next) => {
    let token;

    // Check for "Bearer <token>"
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]; // extract token
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            // Attach decoded user payload to request
            req.user = decoded.user;
            next(); // pass control to next middleware/route handler
        } catch (err) {
            res.status(401);
            throw new Error("Not authorized, invalid or expired token");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token provided");
    }
});