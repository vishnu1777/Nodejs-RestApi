const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const dotenv = require("dotenv").config();

connectDb();
const app = express();
const port = process.env.PORT || 5000;

// If we want to use the middleware also 'use' is used
// This middle ware provides a parser to parse the body from client to server
app.use(express.json());
app.use(cors());
// Here the use is the middleware which talks with the routes whenever it get hits with /api/contacts
app.use("/api/contacts", require("./routes/contactRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use(errorHandler);
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
