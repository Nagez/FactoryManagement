const usersRepo = require('../repositories/usersRepo');

const getAllUsers = async () => {
  return await usersRepo.getAllUsers();
};

const loadUsersToDB = async () => {
  let { data: users } = await usersRepo.getAllUsersFromSource();

  users = users.map((user) => {
    const randomNum = Math.floor(Math.random() * (10 - 4 + 1)) + 4; //number of actions randomly between 4 and 10
    return {
      UserId: user.id,
      FullName: user.name,
      NumOfActions: randomNum,
      RemainingActions: randomNum,
    };
  });
  await usersRepo.loadUsersToDB(users); // Call the repository function
};

const findUserByUsernameAndMail = async (username, mail) => {
  // Fetch all users
  const { data: users } = await usersRepo.getAllUsersFromSource();

  // Find the user matching the username and mail
  const user = users.find((user) => user.username === username && user.email === mail);

  // Return the found user or null
  return user || null;
};

const getUserById = (userId) => {
  return usersRepo.findUser({ UserId: userId });
}

const userActionTaken = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    // Return an error response if the user is not found
    return { error: 'User not found', status: 404 };
  }

    //substruct an action
  let remainingActions = user.RemainingActions - 1;

  //Check if last action was before today and renew actions if it is
  const today = new Date().toISOString().split('T')[0];
  const lastActionDate = new Date(user.LastAction).toISOString().split('T')[0];
  if (today > lastActionDate) {
    console.log('Renewing actions')
    remainingActions = user.NumOfActions -1;
  }

  // Check if the user has remaining actions
  if (remainingActions < 0) {
    return { error: 'No remaining actions available', status: 403 };
  }

  const updatedData = {
    RemainingActions: remainingActions,
    LastAction: new Date(),
  };

  // Update the user and return the updated document
  const updatedUser = usersRepo.updateUser(user._id, updatedData);
  return updatedUser;
}


module.exports = {
  getAllUsers,
  findUserByUsernameAndMail,
  loadUsersToDB,
  getUserById,
  userActionTaken,
};