// This file contains all the logic for the routes
const asyncHandler = require("express-async-handler");
// async handler is an package that looks for if there is an exception
// so we need not to make a try catch block for all to the controllers

const getContacts = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json({ message: `Get info of specific contact of id ${req.params.id}` });
});

const createContact = asyncHandler(async (req, res) => {
  console.log(`The req body is :`, req.body);
  const { name, email, password } = req.body;
  // if there is no data from body throw error and set status for the response
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  res
    .status(201)
    .json({ message: `Get a sigle contact for id ${req.params.id}` });
});

const getContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get all contacts" });
});

const updateContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update Contact ${req.params.id}` });
});

const deleteContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Deleted  Contact ${req.params.id}` });
});

module.exports = {
  getContact,
  getContacts,
  createContact,
  updateContact,
  deleteContact,
};
