const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// jwt has 3 layers a 1)header where it has the algorithm of jwt
// 2) user data
// 3) token signature
const jwt = require("jsonwebtoken");
const User = require("../models/userModal");

// registerer logic starts here
const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userAvailable = await User.findOne({ email });
  console.log("user available", userAvailable);
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }
  // hashing the password is done by bcrypt
  // the second arguement 10 is the no of salt rounds that we want to hash the password
  const hashedPass = await bcrypt.hash(password, 10);
  const user = await User.create({
    userName,
    email,
    password: hashedPass,
  });
  console.log("User created successfully", user);

  if (user) {
    res.status(201).json({ _id: user._id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User Data is not valid");
  }
  res.status(201).json({ message: "Register the user" });
});
// register ends here

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  // serch for the user
  const user = await User.findOne({ email });
  // once we get user compare the user typed password with the password stored in db
  // but password is hashed de hash it
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        // providing the payload to jwt
        // payload is the one that contain user info
        user: {
          userName: user.userName,
          email: user.email,
          id: user._id,
        },
      },
      // passing the signature which is the third data in jwt
      process.env.ACCESS_TOKEN_SECRET,
      // expriation time for the jwt and it expires it on 1minute
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Credentials are not valid");
  }
});

// @desc Current user info
// @route POST /api/users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
  res.status(201).json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
