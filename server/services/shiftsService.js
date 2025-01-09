const shiftsRepo = require('../repositories/shiftsRepo');

const getAllShifts = (filters) => {
  return shiftsRepo.getAllShifts(filters);
};

const getById = (id) => {
  return shiftsRepo.getById(id);
};

const addShift = (obj) => {
  return shiftsRepo.addShift(obj);
};

const updateShift = (id, obj) => {
  return shiftsRepo.updateShift(id, obj);
};

const deleteShift = (id) => {
  return shiftsRepo.deleteShift(id);
};

module.exports = {
  getAllShifts,
  getById,
  addShift,
  updateShift,
  deleteShift,
};
