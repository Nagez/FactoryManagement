import useFetchCollection from "../components/useFetchCollection";
import { useNavigate, Link } from "react-router-dom";
import DynamicTable from '../components/DynamicTable';
import { useEffect, useState } from "react";

export default function Departments() {
    const { data: departmentsData } = useFetchCollection('departments');
    const { data: employeesData } = useFetchCollection("employees");

    const navigate = useNavigate();
    const columns = [
        { key: "name", label: "Name" },
        { key: "manager", label: "Manager" },
        { key: "employees", label: "Employees" },
    ];

  const [transformedData, setTransformedData] = useState([]);

  useEffect(() => {
    if (employeesData && departmentsData) {
      const transformed = departmentsData.map((department) => {
        // Find manager details by matching the Manager ID
        const manager = employeesData.find(
          (employee) => employee._id === department.Manager
        );

        // Find all employees in the department
        const departmentEmployees = employeesData.filter(
          (employee) => employee.DepartmentID === department._id
        );

        return {
          id: department._id, // Ensure unique ID for linking
          name: (
            <Link to={`/EditDepartment/${department._id}`}>
              {department.Name}
            </Link>
          ), // Link to edit department
          manager: manager ? (
            <Link to={`/EditEmployee/${manager._id}`}>
              {manager.FirstName} {manager.LastName}
            </Link>
          ) : (
            "No Manager Assigned"
          ), // Display manager's name or fallback text
          employees:
            departmentEmployees.length > 0 ? (
              departmentEmployees.map((employee) => (
                <div key={employee._id}>
                  <Link to={`/EditEmployee/${employee._id}`}>
                    {employee.FirstName} {employee.LastName}
                  </Link>
                </div>
              ))
            ) : (
              "No Employees"
            ),
        };
      });

      setTransformedData(transformed);
    }
  }, [employeesData, departmentsData]);

    return (
        <div>
            <h2>Departments</h2>
            <DynamicTable columns={columns} data={transformedData}/>
            <button type="button" onClick={() => navigate("/NewDepartment")}>
                Add new department
            </button>

        </div>
    )
}