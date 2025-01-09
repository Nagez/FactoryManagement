import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Main Page</h1>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <li style={{ cursor: "pointer", color: "blue" }} onClick={() => handleNavigation("/departments")}>
          Department
        </li>
        <li style={{ cursor: "pointer", color: "blue" }} onClick={() => handleNavigation("/employees")}>
          Employees
        </li>
        <li style={{ cursor: "pointer", color: "blue" }} onClick={() => handleNavigation("/shifts")}>
          Shifts
        </li>
        <li style={{ cursor: "pointer", color: "blue" }} onClick={() => handleNavigation("/users")}>
          Users
        </li>
      </ul>
    </div>
  );
};

export default MainPage;
