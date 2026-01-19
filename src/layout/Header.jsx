import { getUser, logout } from "../utils/auth";
import "./layout.css";

export default function Header() {
  const user = getUser();

  function handleLogout() {
    logout();
    window.location.href = "/";
  }

  return (
    <header className="app-header">
      <div className="header-left">
        <strong>BVAS</strong>
      </div>

      <div className="header-right">
        {user?.username && (
          <span style={{ marginRight: "12px" }}>
            Logged in as <strong>{user.username}</strong>
          </span>
        )}

        <button className="btn btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
