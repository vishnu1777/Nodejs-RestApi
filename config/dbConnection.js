const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNNECTION_STRING);
    console.log(`Connected to db:of name  :${connect.connection.name}`);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

module.exports = connectDb;
