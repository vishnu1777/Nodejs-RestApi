const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// If we want to use the middleware also 'use' is used
// This middle ware provides a parser to parse the body from client to server
app.use(express.json());

// Here the use is the middleware which talks with the routes whenever it get hits with /api/contacts
app.use("/api/contacts", require("./routes/contactRoute"));
app.use(errorHandler);
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
