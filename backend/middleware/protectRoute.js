const jwt = require("jsonwebtoken")
const User = require("../model/userModel")
const protectRoute = async(req, res, next) => {
  try {
    const token = req.cookies.jwt
    if(!token){
      return res.status(400).json({error: "Unauthorized - No token provided"})
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if(!decoded){
      return res.status(400).json({message: "Unauthorized - Invalid Token"})
    }

    const user = await User.findById(decoded.userId).select("-password")
    if(!user){
      return res.status(400).json({error: "User not found"})
    }

    req.user = user

    next()

  } catch (error) {
    return res.status(500).json({message: "Internal server error"})
  }
}

module.exports = protectRoute