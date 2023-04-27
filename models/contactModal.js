const mongoose = require("mongoose");

// creating a schema using mongoose
const Schema = mongoose.Schema;
const contactSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      // this is done because only a user can use the routes
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  }
  // {
  //   timestamps: true,
  // }
);

// exporting by turning the schema into a model
const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
