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
                        <h2 >Factory Management</h2>
                    </Link>
                ) : (
                     <h2 >Factory Management</h2>
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
