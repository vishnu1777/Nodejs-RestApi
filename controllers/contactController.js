// This file contains all the logic for the routes
const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModal");

// async handler is an package that looks for if there is an exception
// so we need not to make a try catch block for all to the controllers

// @desc Get all the contacts
// @route GET /api/contacts
// @access private

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

// @desc Create the contact
// @route GET /api/contacts
// @access private

const createContact = asyncHandler(async (req, res) => {
  console.log(`The req body is :`, req.body);
  const { name, email, phone } = req.body;
  console.log(name);
  // if there is no data from body throw error and set status for the response
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

// @desc Get the contact
// @route POST /api/contacts/:id
// @access private

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

// @desc update the contact
// @route PUT /api/contacts/:id
// @access private

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  // this is to ensure that different user is not trying to get other users contacts
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User dont have permission to update other user contact");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

// @desc update the contact
// @route DELETE /api/contacts/:id
// @access private

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  console.log(contact);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  // this is to ensure that different user is not trying to get other users contacts
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User dont have permission to update other user contact");
  }
  await Contact.deleteOne(contact);
  res.status(200).json(contact);
});

module.exports = {
  getContact,
  getContacts,
  createContact,
  updateContact,
  deleteContact,
};
