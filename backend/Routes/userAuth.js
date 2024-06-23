const express = require("express");
const bcrypt = require("bcryptjs")
const User = require("../model/userModel");
const generateTokenAndSetCookies = require("../utils/generateToken");
const router = express.Router();

// user signup route
router.post("/signup", async (req, res) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;
    
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;

    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    if (password != confirmPassword) {
      return res.status(400).json({ error: "Password don't match" });
    }
    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "User already exist" });
    }

    // Hash password here
    const hashPass = await bcrypt.hash(password, 10)

    const newUser = new User({
      fullname,
      username,
      password: hashPass,
      gender,
      profilepic: gender == "male" ? boyProfilePic : girlProfilePic,
    });

    if(newUser){
      await newUser.save()

      generateTokenAndSetCookies(newUser._id, res)

      return res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        gender: newUser.gender,
        profilePic: newUser.profilepic,
      });
    } else {
      return res.status(400).json({error: "Invalid user data."})
    }
    

  } catch (err) {
    console.log("error in signup controller", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async(req, res) => {
  try {
    const {username, password} = req.body;

    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

    if (!user || ! isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username and password" });
    }

    generateTokenAndSetCookies(user._id, res)

    return res.status(201).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      gender: user.gender,
      profilePic: user.profilepic
    })

  } catch (err) {
    console.log("error in login controller", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/logout", (req, res) => {
  try {
    res.cookie("jwt", "", {maxAge: 0})
    return res.status(201).json({message: "Logged out successfully"})
  } catch (err) {
    console.log("error in login controller", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
