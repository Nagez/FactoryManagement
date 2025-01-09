import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../redux/userReducer';
import LogoutButton from "../components/LogoutButton";
import { Link } from "react-router-dom";

export default function TopBar() {

    const user = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();

    const handleLogout = () => {
        sessionStorage.removeItem('token'); // Clear token
        dispatch(clearUser()); // Clear user from Redux
    };

    return (
        <div
            style={{
                padding: "10px",
                backgroundColor: "#f5f5f5",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            {user ? (
                <Link to="/MainPage" style={{ textDecoration: "none", color: "inherit" }}>
                    <h2 
                        style={{
                            transition: "background-color 0.3s ease",
                            padding: "5px",  // Optional: Add some padding for the background to show
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 255, 0.2)'} // Hover transparent background
                        onMouseLeave={(e) => e.target.style.backgroundColor = ''} // Revert to no background
                    >
                        Factory Management
                    </h2>
                </Link>
            ) : (
                <h2 
                    style={{
                        transition: "background-color 0.3s ease",
                        padding: "5px",  // Optional: Add some padding for the background to show
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 255, 0.2)'} // Hover transparent background
                    onMouseLeave={(e) => e.target.style.backgroundColor = ''} // Revert to no background
                >
                    Factory Management
                </h2>
            )}
            {user && (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                    }}
                >
                    <span>Welcome, {user.name}!</span>
                    <LogoutButton onLogout={handleLogout} />
                </div>
            )}
        </div>
    );
}
