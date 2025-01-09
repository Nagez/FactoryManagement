const logsRepo = require("../repositories/logsRepo")

const getAllData = async () => {

  const { actionLogsFile } = await logsRepo.getAlllogs();
 
  return actionLogsFile;
};

const logActions = async (user) => {
    await logsRepo.writeLog(user);
  };

module.exports = { getAllData, logActions };
