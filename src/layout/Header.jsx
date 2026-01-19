import { useNavigate } from "react-router-dom";
import "./layout.css";

export default function Header() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const getRoleLabel = () => {
    if (!user?.role) return "";
    if (user.role === "VENDOR") return "Vendor";
    if (user.role === "DISTRICT_VERIFIER") return "District Verifier";
    if (user.role === "HQ_ADMIN") return "HQ Admin";
    return user.role;
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <span className="app-title">Bill Verification System</span>
      </div>

      <div className="header-right">
        <div className="user-info">
          <span className="user-name">{user?.name || "User"}</span>
          <span className="user-role">{getRoleLabel()}</span>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
