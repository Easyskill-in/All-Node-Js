const JWT = require("jsonwebtoken")
const { JWT_SECRET } = require("../Config/env")
async function JWT_Verify(req, res, next) {

    if (!req.cookies.token) {
        return res.json({
            success: false,
            message: "No Token Found"
        })
    }

    const isMatch = JWT.verify(req.cookies?.token, JWT_SECRET)

    if (!isMatch) {
        return res.json({
            success: false,
            message: "Invalid Token"
        })
    }

    req.user = isMatch;

    next();


}

module.exports = { JWT_Verify };