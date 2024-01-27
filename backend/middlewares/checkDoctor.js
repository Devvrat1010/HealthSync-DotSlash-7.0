require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function checkDoctor(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.data.role !== "doctor") {
            throw new Error("Not a Doctor");
        } else {
            req.body = decoded.data;
            next();
        }
    } catch (error) {
        res.status(401).json({
            message: "Authentication failed",
            error: error,
        });
    }
}

module.exports = checkDoctor;