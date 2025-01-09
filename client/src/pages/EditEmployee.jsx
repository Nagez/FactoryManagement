import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "axios";
import useFetchCollection from "../components/useFetchCollection";

const EMPLOYEE_URL = "http://localhost:3000/employees";
const SHIFTS_URL = "http://localhost:3000/shifts";

export default function EditEmployee() {
  const { id } = useParams(); // Get the employee ID from the URL
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Use the useFetchCollection hook to fetch employees and departments
  const { data: employeesData } = useFetchCollection("employees");
  const { data: departmentsData } = useFetchCollection("departments");
  const { data: shiftsData, refetch: refetchShifts } = useFetchCollection("shifts");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axiosInstance.get(`${EMPLOYEE_URL}/${id}`, {
          headers: {
            "x-access-token": token,
          },
        });
        setEmployee(response.data);
      } catch (err) {
        setError("Failed to fetch employee data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`${EMPLOYEE_URL}/${id}`, employee, {
        headers: {
          "x-access-token": token,
        },
      });
      alert("Employee updated successfully");
      navigate("/employees"); // Go back to the employees list after successful update
    } catch (err) {
      setError("Failed to update employee");
      console.error(err);
    }
  };

  const handleAddToShift = async (shiftId) => {
    try {
      const updatedShift = shiftsData.find((shift) => shift._id === shiftId);
      if (!updatedShift.AssignedEmployees.includes(employee._id)) {
        updatedShift.AssignedEmployees.push(employee._id);
      }
      await axiosInstance.put(`${SHIFTS_URL}/${shiftId}`, updatedShift, {
        headers: {
          "x-access-token": token,
        },
      });
      alert("Employee added to shift successfully");
      refetchShifts(); // Refetch the shifts after updating
    } catch (err) {
      setError("Failed to add employee to shift");
      console.error(err);
    }
  };

  // Helper function to get employee name from ID
  const getEmployeeNameById = (employeeId) => {
    const employee = employeesData.find(emp => emp._id === employeeId);
    return employee ? `${employee.FirstName} ${employee.LastName}` : 'Unknown Employee';
  };

  if (loading) return <p>Loading employee data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="FirstName">First Name:</label>
          <input
            type="text"
            id="FirstName"
            name="FirstName"
            value={employee.FirstName || ""}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="LastName">Last Name:</label>
          <input
            type="text"
            id="LastName"
            name="LastName"
            value={employee.LastName || ""}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="StartWorkYear">Start Work Year:</label>
          <input
            type="number"
            id="StartWorkYear"
            name="StartWorkYear"
            value={employee.StartWorkYear || ""}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="DepartmentID">Department:</label>
          <select
            id="DepartmentID"
            name="DepartmentID"
            value={employee.DepartmentID || ""}
            onChange={handleInputChange}
          >
            <option value="">None</option>
            {departmentsData.map((department) => (
              <option key={department._id} value={department._id}>
                {department.Name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={() => navigate("/employees")}>
          Cancel
        </button>
      </form>
      <br></br>
      <h2>Shifts</h2>
      <ul>
        {shiftsData?.map((shift) => (
          <div key={shift._id}>
          <li>
            <p>Date: {shift.Date.split("T")[0]}</p>
            <p>Time: Start: {shift.StartingHour} End: {shift.EndingHour}</p>
            <p>Assigned Employees: {shift.AssignedEmployees.map(getEmployeeNameById).join(", ")}</p>
            <button onClick={() => handleAddToShift(shift._id)}>
              Add Employee to Shift
            </button>
          </li>
          <br></br>
          </div>
        ))}
      </ul>
    </div>
  );
}
