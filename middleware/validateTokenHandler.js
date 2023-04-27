const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    // the below code is for
    // in header there is an Authorization sectino
    // it contain Bearer [JWTtoken]
    // Bearer is in the 0 th index and JWT token is in 1 index
    // we first make the token split by space so we get Bearer "Token"
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedInfo) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      req.user = decodedInfo.user;
      // next() is a middle ware
      next();
    });
    if (!token) {
      res.status(401);
      throw new Error("User is not Authorized or missing token");
    }
  }
});

module.exports = validateToken;
