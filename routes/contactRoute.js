const express = require("express");
const router = express.Router();
const {
  getContact,
  createContact,
  getContacts,
  deleteContact,
  updateContact,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

// Get is used to get the data
// Since we are routing to same route ie / or /:id we can merge it in single way
router.use(validateToken); // this is used if all the routes are private and should be validated
router.route("/").get(getContacts).post(createContact);

// :id is dynamic id form client side and it is used to get single contact
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

// Post method is used to store the data which is passed from client and to database
// router.route("/").post(updateContact);

// Put is used to update the data from an id
// router.route("/:id").put(updateContact);

// delete is used to delete the data from a specific id
// router.route("/:id").delete(deleteContact);

module.exports = router;
