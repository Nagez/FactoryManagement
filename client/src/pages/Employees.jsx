import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useFetchCollection from "../components/useFetchCollection";
import DynamicTable from "../components/DynamicTable";

export default function Employees() {
  const { data: employeesData } = useFetchCollection("employees");
  const { data: departmentsData } = useFetchCollection("departments");
  const { data: shiftsData } = useFetchCollection("shifts");
  const navigate = useNavigate();

  const columns = [
    { key: "fullName", label: "Full Name" },
    { key: "department", label: "Department" },
    { key: "shifts", label: "Shifts" }, // Add Shifts column
  ];

  const [transformedData, setTransformedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  useEffect(() => {
    if (employeesData && departmentsData && shiftsData) {
      const transformed = employeesData.map((employee) => {
        const department = departmentsData.find(
          (dept) => dept._id === employee.DepartmentID
        );

        // Find shifts assigned to the employee
        const assignedShifts = shiftsData
          .filter((shift) =>
            shift.AssignedEmployees.includes(employee._id) // Check if employee is assigned to this shift
          )
          .map((shift, index) => (
            <div key={index}>
              {shift.Date.split("T")[0]}: Starting Hour: {shift.StartingHour}, Ending Hour: {shift.EndingHour}
            </div>
          ));
        return {
          id: employee.id, // Add employee ID for linking
          fullName: (
            <Link to={`/EditEmployee/${employee._id}`}>
              {employee.FirstName} {employee.LastName}
            </Link>
          ), // Link to employee page
          department: department ? (
            <Link to={`/EditDepartment/${department._id}`}>
              {department.Name}
            </Link>
          ) : (
            "Unknown Department"
          ), // Link for department
          departmentName: department ? department.Name : "Unknown Department", // Store department name for filtering
          shifts: assignedShifts || "No Shifts Assigned", // Add shifts data
        };
      });
      setTransformedData(transformed);
      setFilteredData(transformed);
    }
  }, [employeesData, departmentsData, shiftsData]);

  useEffect(() => {
    if (selectedDepartment === "") {
      setFilteredData(transformedData); // No filter, show all employees
    } else {
      setFilteredData(
        transformedData.filter(
          (employee) => employee.departmentName === selectedDepartment // Compare departmentName for filtering
        )
      );
    }
  }, [selectedDepartment, transformedData]);

  return (
    <div>
      <h2>Employees</h2>

      {/* Dropdown for department selection */}
      <label htmlFor="departmentFilter">Filter by Department:</label>
      <select
        id="departmentFilter"
        value={selectedDepartment}
        onChange={(e) => setSelectedDepartment(e.target.value)}
      >
        <option value="">All Departments</option>
        {departmentsData &&
          departmentsData.map((department, index) => (
            <option key={index} value={department.Name}>
              {department.Name}
            </option>
          ))}
      </select>

      {/* Dynamic table to display employees */}
      <DynamicTable columns={columns} data={filteredData} />
      <button type="button" onClick={() => navigate("/NewEmployee")}>
        Add new employees
      </button>
    </div>
  );
}
