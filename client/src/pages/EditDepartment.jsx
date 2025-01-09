import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "axios";

const DEPARTMENTS_URL = "http://localhost:3000/departments";
const EMPLOYEES_URL = "http://localhost:3000/employees";

export default function EditDepartment() {
  const { id } = useParams(); // Get the department ID from the URL
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const [department, setDepartment] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [unassignedEmployees, setUnassignedEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(""); // For dropdown selection

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch department data
        const departmentResponse = await axiosInstance.get(`${DEPARTMENTS_URL}/${id}`, {
          headers: {
            "x-access-token": token,
          },
        });
        setDepartment(departmentResponse.data);

        // Fetch employees for dropdown
        const employeesResponse = await axiosInstance.get(EMPLOYEES_URL, {
          headers: {
            "x-access-token": token,
          },
        });
        setEmployees(employeesResponse.data);

        const filteredEmployees = employeesResponse.data.filter(
          (employee) => employee?.DepartmentID !== id
        );

        setUnassignedEmployees(filteredEmployees);
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDepartment((prev) => ({ ...prev, [name]: value }));
  };

  const handleManagerChange = (e) => {
    const { value } = e.target;
    setDepartment((prev) => ({ ...prev, Manager: value || null })); // Set to null if no manager selected
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedDepartment = { ...department };
      if (!department.Manager) {
        delete updatedDepartment.Manager; // Remove the Manager field if empty
      }
      await axiosInstance.put(`${DEPARTMENTS_URL}/${id}`, updatedDepartment, {
        headers: {
          "x-access-token": token,
        },
      });
      alert("Department updated successfully");
      navigate("/departments");
    } catch (err) {
      setError("Failed to update department");
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await axiosInstance.delete(`${DEPARTMENTS_URL}/${id}`, {
          headers: {
            "x-access-token": token,
          },
        });
        alert("Department deleted successfully");
        navigate("/departments");
      } catch (err) {
        setError("Failed to delete department");
        console.error(err);
      }
    }
  };

  const handleAssignEmployee = async () => {
    if (!selectedEmployee) {
      alert("Please select an employee to assign.");
      return;
    }
    try {
      // Assign the employee to the department
      await axiosInstance.put(
        `${EMPLOYEES_URL}/${selectedEmployee}`,
        { DepartmentID: id },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      // Update the list of unassigned employees after assigning
      setUnassignedEmployees((prev) =>
        prev.filter((employee) => employee._id !== selectedEmployee)
      );
      alert("Employee assigned to department.");
    } catch (err) {
      setError("Failed to assign employee");
      console.error(err);
    }
  };

  if (loading) return <p>Loading department data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Edit Department</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Name">Name:</label>
          <input
            type="text"
            id="Name"
            name="Name"
            value={department.Name || ""}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="Manager">Manager:</label>
          <select
            id="Manager"
            name="Manager"
            value={department.Manager || ""}
            onChange={handleManagerChange}
          >
            <option value="">None</option> {/* Option to skip assigning a manager */}
            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.FirstName} {employee.LastName}
              </option>
            ))}
          </select>
        </div>

        {/* Unassigned Employees Dropdown */}
        <div>
          <label htmlFor="UnassignedEmployees">Unassigned Employees:</label>
          <select
            id="UnassignedEmployees"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="">Select an employee</option>
            {unassignedEmployees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.FirstName} {employee.LastName}
              </option>
            ))}
          </select>
        </div>
        <button type="button" onClick={handleAssignEmployee}>
          Add Employee to Department
        </button>
        <br />
        <button type="submit">Save Changes</button>
        <button type="button" onClick={handleDelete} style={{ marginLeft: "10px" }}>
          Delete Department
        </button>
        <button type="button" onClick={() => navigate("/departments")} style={{ marginLeft: "10px" }}>
          Cancel
        </button>
      </form>
    </div>
  );
}
