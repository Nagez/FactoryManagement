const employeesRepo = require('../repositories/employeesRepo');

const getAllEmployees = (filters) => {
  return employeesRepo.getAllEmployees(filters);
};

const getById = (id) => {
  return employeesRepo.getById(id);
};

const addEmployee = async (obj) => {
  try {
    return await employeesRepo.addEmployee(obj);
  } catch (error) {
    console.error('Error in addEmployee service:', error);
    throw new Error('Failed to add employee');
  }
};

const updateEmployee = (id, obj) => {
  return employeesRepo.updateEmployee(id, obj);
};

const deleteEmployee = (id) => {
  return employeesRepo.deleteEmployee(id);
};

module.exports = {
  getAllEmployees,
  getById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
