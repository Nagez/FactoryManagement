import { useState } from "react";
import useFetchCollection from "../components/useFetchCollection";
import axiosInstance from "axios";

const SHIFTS_URL = "http://localhost:3000/shifts";

export default function Shifts() {
  const { data: shiftsData, refetch: refetchShifts } = useFetchCollection("shifts");
  const { data: employeesData } = useFetchCollection("employees");

  const [shiftDate, setShiftDate] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [allocatedEmployees, setAllocatedEmployees] = useState([]);
  const [editingShiftId, setEditingShiftId] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState("");  // New state to handle the employee selection

  const token = sessionStorage.getItem("token");

  const handleSaveShift = async () => {
    if (!shiftDate || !startTime || !endTime) {
      alert("Please select date and time.");
      return;
    }

    const newShift = {
      Date: shiftDate,
      StartingHour: startTime,
      EndingHour: endTime,
      AssignedEmployees: allocatedEmployees,
    };

    try {
      if (editingShiftId) {
        // Update an existing shift
        await axiosInstance.put(`${SHIFTS_URL}/${editingShiftId}`, newShift, {
          headers: {
            "x-access-token": token,
          },
        });
        alert("Shift updated successfully.");
      } else {
        // Add a new shift
        await axiosInstance.post(SHIFTS_URL, newShift, {
          headers: {
            "x-access-token": token,
          },
        });
        alert("New Shift created successfully.");
      }
      refetchShifts();
      resetForm();
    } catch (error) {
      console.error("Error saving shift:", error);
      alert("Failed to save shift. Please try again.");
    }
  };

  const handleAllocateEmployee = (employeeId) => {
    if (!allocatedEmployees.includes(employeeId)) {
      setAllocatedEmployees((prev) => [...prev, employeeId]);
    }
  };

  const handleRemoveAllocatedEmployee = (employeeId) => {
    setAllocatedEmployees((prev) =>
      prev.filter((id) => id !== employeeId)
    );
  };

  const resetForm = () => {
    setShiftDate("");
    setStartTime(0);
    setEndTime(0);
    setAllocatedEmployees([]);
    setEditingShiftId(null);
    setSelectedEmployee("");  // Reset the selected employee
  };

  const handleEditShift = (shift) => {
    setShiftDate(shift.Date.split("T")[0]);
    setStartTime(shift.StartingHour);
    setEndTime(shift.EndingHour);
    setAllocatedEmployees(shift.AssignedEmployees);
    setEditingShiftId(shift._id);
  };

  const getEmployeeName = (employeeId) => {
    const employee = employeesData?.find((emp) => emp._id === employeeId);
    return employee ? `${employee.FirstName} ${employee.LastName}` : "Unknown Employee";
  };

  return (
    <div>
      <h2>Shifts</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSaveShift();
        }}
        style={{ marginBottom: "20px" }}
      >
        <div>
          <label>Shift Date:</label>
          <input
            type="date"
            value={shiftDate}
            onChange={(e) => setShiftDate(e.target.value)}
          />
        </div>
        <div>
          <label>Starting Hour:</label>
          <input
            type="number"
            min="0"
            max="24"
            step="1"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div>
          <label>Ending Hour:</label>
          <input
            type="number"
            min="0"
            max="24"
            step="1"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <div>
          <label>Allocate Employees:</label>
          <select
            value={selectedEmployee} // Bind the select to the selectedEmployee state
            onChange={(e) => {
              setSelectedEmployee(e.target.value);
              handleAllocateEmployee(e.target.value);
            }}
          >
            <option value="" disabled>
              Select an Employee
            </option>
            {employeesData?.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.FirstName} {employee.LastName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p>
            {allocatedEmployees.map((id) => (
              <span key={id}>
                {getEmployeeName(id)}{" "}
                <button
                  type="button"
                  onClick={() => handleRemoveAllocatedEmployee(id)}
                >
                  Remove
                </button>
              </span>
            ))}
          </p>
        </div>
        <button type="submit">{editingShiftId ? "Update Shift" : "Add Shift"}</button>
        <button type="button" onClick={resetForm} style={{ marginLeft: "10px" }}>
          Reset
        </button>
      </form>

      <h3>Existing Shifts:</h3>
      <ul>
        {shiftsData?.map((shift) => (
          <li key={shift._id}>
            {shift.Date.split("T")[0]}: Starting Hour: {shift.StartingHour}, Ending Hour:{" "}
            {shift.EndingHour}, Allocated Employees:{" "}
            {shift.AssignedEmployees.map(getEmployeeName).join(", ") || "None"}{" "}
            <button onClick={() => handleEditShift(shift)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
