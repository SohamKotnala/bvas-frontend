import { logout } from "../utils/auth";
import "./layout.css";

export default function Header({ user }) {
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
        <span className="header-username">
          {user.username} ({user.role})
        </span>

        <button className="btn btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
