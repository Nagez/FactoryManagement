const Shift = require('../models/shiftModel');

// Get All
const getAllShifts = (filters) => {
  return Shift.find(filters);
};

// Get By ID
const getById = (id) => {
  return Shift.findById(id);
};

// Create
const addShift = (obj) => {
  const per = new Shift(obj);
  return per.save();
};

// Update
const updateShift = (id, obj) => {
  return Shift.findByIdAndUpdate(id, obj);
};

// Delete
const deleteShift = (id) => {
  return Shift.findByIdAndDelete(id);
};

module.exports = {
  getAllShifts,
  getById,
  addShift,
  updateShift,
  deleteShift,
};
