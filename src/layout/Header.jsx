import { getUser, logout } from "../utils/auth";
import "./layout.css";

export default function Header() {
  const user = getUser();

  // 🔒 Absolute guard
  if (!user || !user.username) {
    return null;
  }

  return (
    <header className="app-header">
      <div>
        Logged in as <strong>{user.username}</strong>
      </div>

      <button
        className="btn btn-secondary"
        onClick={() => {
          logout();
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </header>
  );
}
