import Header from "./Header";
import Sidebar from "./Sidebar";
import { getUser, logout } from "../utils/auth";
import "./layout.css";

export default function AppLayout({ children }) {
  const user = getUser();

  // Safety guard (prevents blank screen)
  if (!user) {
    logout();
    window.location.href = "/";
    return null;
  }

  return (
    <div className="app-container">
      <Sidebar user={user} />

      <div className="app-main">
        <Header user={user} />

        <main className="app-content">
          {children}
        </main>
      </div>
    </div>
  );
}
