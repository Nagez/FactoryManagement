const jf = require('jsonfile');
const FILE = 'logs/actionLogs.json';
const User = require('../models/userModel');

// Get all logs
const getAlllogs = async () => {
  try {
    const logs = await jf.readFile(FILE);
    return logs;
  } catch (error) {
    console.error("Error reading logs:", error);
    return { actions: [] }; // Return empty actions array if file read fails
  }
};

// Write a log (update or create a new one)
const writeLog = async (user) => {
  try {
    const logs = await getAlllogs();

    let userLog = {
      userId: user.UserId,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      maxActionsPerDay: user.NumOfActions,
      remainingActions: user.RemainingActions,
    };
    logs.actions.push(userLog);

    // Write the updated logs back to the JSON file
    await jf.writeFile(FILE, logs, { spaces: 2 });
    console.log(`Log for user ${user.UserId} written successfully.`);
  } catch (error) {
    console.error("Error writing log:", error);
  }
};
/*
// Function to calculate remaining actions for the user
const calculateRemainingActions = async (userId) => {
  try {
    // Fetch all logs
    const logs = await getAlllogs();
    const today = new Date().toISOString().split('T')[0];

    // Fetch the user's max actions per day from the User collection
    const user = await User.findOne({ id: userId });
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    const maxActionsPerDay = user.NumOfActions || 0;

    // Filter logs for today's actions by the user
    const todayLogs = logs.actions.filter(
      (log) => log.userId === userId && log.date === today
    );

    // Calculate the number of actions the user has already taken today
    const actionsTakenToday = todayLogs.reduce(
      (total, log) => total + log.actionsTaken,
      0 // Assuming `actionsTaken` represents the number of actions in a log entry
    );

    // Calculate remaining actions
    const remainingActions = Math.max(maxActionsPerDay - actionsTakenToday, 0);

    console.log(`User: ${userId}, Remaining Actions: ${remainingActions}, Max Actions: ${maxActionsPerDay}, Actions Taken Today: ${actionsTakenToday}`);

    return {
      remainingActions,
      maxActionsPerDay,
    };
  } catch (error) {
    console.error('Error calculating remaining actions:', error);
    throw error;
  }
    
};
*/


module.exports = { getAlllogs, writeLog };
