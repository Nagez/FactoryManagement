const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema(
  {
    Date: Date,
    StartingHour: Number,
    EndingHour: Number,
    AssignedEmployees: { type: [mongoose.Schema.Types.ObjectId], ref: 'Employee', default:[] }
  },
  { versionKey: false }
);

const Shift = mongoose.model('shift', shiftSchema);

module.exports = Shift;
