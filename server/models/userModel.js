const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    UserId: String,
    FullName: String,
    NumOfActions: Number,
    RemainingActions: Number,
    LastAction: Date,
  },
  { versionKey: false }
);

const User = mongoose.model('user', userSchema);

module.exports = User;
