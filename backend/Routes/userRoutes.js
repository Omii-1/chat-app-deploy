const router = require("express").Router()
const protectRoute = require("../middleware/protectRoute")
const User = require("../model/userModel")

router.get("/", protectRoute, async(req, res)=>{
  try {
    const userId = req.user._id

    const allUsers = await User.find({_id: {$ne : userId}}).select("-password")

    res.status(200).json(allUsers)

  } catch (error) {
    console.log("Error in getAllUsers : ", error.message);
    res.status(500).json({error: "Internal server error"})
  }
})

module.exports = router