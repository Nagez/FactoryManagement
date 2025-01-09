import { useNavigate } from "react-router-dom";

export default function LogoutButton({ onLogout }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        onLogout(); // Notify the parent about logout
        navigate('/');
    };

    return (
        <button
            onClick={handleLogout}
            style={{
                padding: "5px 10px",
                borderRadius: "5px",
                backgroundColor: "#f44336",
                color: "#fff",
                border: "none",
                cursor: "pointer",
            }}
        >
            Logout
        </button>
    );
}
