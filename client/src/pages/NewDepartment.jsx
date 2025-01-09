import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "axios";
import useFetchCollection from "../components/useFetchCollection";

const DEPARTMENTS_URL = "http://localhost:3000/departments";

export default function NewDepartment() {
  const [departmentName, setDepartmentName] = useState("");
  const { data: employeesData } = useFetchCollection("employees"); // Fetch employees
  const [managerId, setManagerId] = useState(""); // Default to empty string for optional manager

  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const handleSave = async () => {
    if (!departmentName) {
      alert("Department Name is required.");
      return;
    }

    const newDepartment = {
      Name: departmentName,
      Manager: managerId || undefined, // Set to undefined if no manager selected
    };

    try {
      const { data } = await axiosInstance.post(DEPARTMENTS_URL, newDepartment, {
        headers: {
          "x-access-token": token,
        },
      });
      console.log("Department added successfully:", data);
      alert(`New Department "${newDepartment.Name}" added`);
      navigate("/departments");
    } catch (error) {
      console.error("Error saving Department:", error);
      alert("Failed to save Department. Please try again.\n" + error);
    }
  };

  return (
    <div>
      <h2>Add Department</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <div>
          <label>Department Name:</label>
          <input
            type="text"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
          />
        </div>
        <div>
          <label>Manager:</label>
          <select
            value={managerId}
            onChange={(e) => setManagerId(e.target.value)}
          >
            <option value="">None</option> {/* Option to skip assigning a manager */}
            {employeesData &&
              employeesData.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.FirstName} {employee.LastName} {/* Assuming employees have a 'name' field */}
                </option>
              ))}
          </select>
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate("/departments")}>
          Cancel
        </button>
      </form>
    </div>
  );
}
