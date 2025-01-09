import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from 'axios';

const EMPLOYEES_URL = 'http://localhost:3000/employees';
const DEPARTMENTS_URL = 'http://localhost:3000/departments';

export default function NewEmployee() {
  const [employeeDetails, setEmployeeDetails] = useState({
    FirstName: "",
    LastName: "",
    StartWorkYear: new Date().getFullYear(),
    DepartmentID: undefined,
  });

  const [departments, setDepartments] = useState([]); // Store department data
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const { data } = await axiosInstance.get(DEPARTMENTS_URL, {
          headers: {
            'x-access-token': token,
          },
        });
        setDepartments(data);
      } catch (error) {
        console.error("Error fetching departments:", error);
        alert("Failed to fetch departments.");
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, [token]);

  const handleSave = async () => {
    if (!employeeDetails.FirstName || !employeeDetails.LastName) {
      alert("Full Name is required.");
      return;
    }
    try {
      const { data } = await axiosInstance.post(EMPLOYEES_URL, employeeDetails, {
        headers: {
          'x-access-token': token,
        },
      });
      console.log("Employee added successfully:", data);
      alert(`New employee ${employeeDetails.FirstName} ${employeeDetails.LastName} added`);
      navigate("/employees"); // Redirect to employees list after saving
    } catch (error) {
      console.error("Error saving employee:", error);
      alert("Failed to save employee. Please try again.\n" + error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value === "" ? undefined : value, // Allow empty department
    }));
  };

  if (loading) return <p>Loading departments...</p>;

  return (
    <div>
      <h2>Add Employee</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="FirstName"
            value={employeeDetails.FirstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="LastName"
            value={employeeDetails.LastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Start Work Year:</label>
          <input
            type="number"
            name="StartWorkYear"
            value={employeeDetails.StartWorkYear}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Department:</label>
          <select
            name="DepartmentID"
            value={employeeDetails.DepartmentID || ""}
            onChange={handleChange}
          >
            <option value="">None</option>
            {departments.map((department) => (
              <option key={department._id} value={department._id}>
                {department.Name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate("/employees")}>
          Cancel
        </button>
      </form>
    </div>
  );
}
