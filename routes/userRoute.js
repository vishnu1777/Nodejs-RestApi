const express = require("express");
const {
  loginUser,
  registerUser,
  currentUser,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);
// first the validity is checked than the current user controller is fired
router.get("/current", validateToken, currentUser);

module.exports = router;
