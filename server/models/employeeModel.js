const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true, 
    },
    LastName: {
      type: String,
      required: true, 
    },
    StartWorkYear: Number,
    DepartmentID: {
          type: mongoose.Schema.Types.ObjectId, 
          ref: "Department", 
        },
  },
  { versionKey: false }
);

const Employee = mongoose.model('employee', employeeSchema);

module.exports = Employee;
