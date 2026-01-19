import "./layout.css";
import { logout } from "../utils/auth";

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
        {user && (
          <span style={{ marginRight: "12px" }}>
            Logged in as{" "}
            <strong>
              {user.role}
              {user.district_code ? ` (${user.district_code})` : ""}
            </strong>
          </span>
        )}

        <button className="btn btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
