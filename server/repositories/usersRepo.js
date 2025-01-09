const axios = require('axios');
const User = require('../models/userModel');

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const getAllUsersFromSource = () => {
  return axios.get(USERS_URL);
};

const getAllUsers = (filters) => {
  return User.find(filters);
};

const getById = (id) => {
  return User.findById(id);
};

const findUser = (query) => {
  return User.findOne(query);
};

const updateUser = (id, obj) => {
  return User.findByIdAndUpdate(id, obj, { new: true });
};

const loadUsersToDB = async (users) => {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('Users already exist in the database. Skipping initialization.');
      return; // Exit if users already exist
    }
    await User.deleteMany({}); //delete existing
    await User.insertMany(users, { ordered: false }); //insert users from the webservice
    //console.log(`${users.length} users have been successfully added to the database.`);
  } catch (error) {
    console.error('Error inserting users into the database:', error);
  }
};

module.exports = {
  getAllUsers,
  loadUsersToDB,
  getById,
  updateUser,
  findUser,
  getAllUsersFromSource,
};
