const departmentsRepo = require('../repositories/departmentsRepo');

const getAllDepartments = (filters) => {
  return departmentsRepo.getAllDepartments(filters);
};

const getById = (id) => {
  return departmentsRepo.getById(id);
};

const addDepartment = (obj) => {
  return departmentsRepo.addDepartment(obj);
};

const updateDepartment = (id, obj) => {
  return departmentsRepo.updateDepartment(id, obj);
};

const deleteDepartment = (id) => {
  return departmentsRepo.deleteDepartment(id);
};

module.exports = {
  getAllDepartments,
  getById,
  addDepartment,
  updateDepartment,
  deleteDepartment,
};
