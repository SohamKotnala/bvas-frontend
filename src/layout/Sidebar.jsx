import { NavLink } from "react-router-dom";
import { getUser } from "../utils/auth";
import "./layout.css";

export default function Sidebar() {
  const user = getUser();
  if (!user) return null;

  const role = user.role;

  return (
    <aside className="app-sidebar">
      <div className="sidebar-section">
        <div className="sidebar-title">Navigation</div>

        {role === "VENDOR" && (
          <ul className="sidebar-menu">
            <li>
              <NavLink to="/vendor" className="sidebar-link">
                Dashboard
              </NavLink>
            </li>
          </ul>
        )}

        {role === "DISTRICT_VERIFIER" && (
          <ul className="sidebar-menu">
            <li>
              <NavLink to="/verifier" className="sidebar-link">
                District Bills
              </NavLink>
            </li>
          </ul>
        )}

        {role === "HQ_ADMIN" && (
          <ul className="sidebar-menu">
            <li>
              <NavLink to="/hq" className="sidebar-link">
                Dashboard
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </aside>
  );
}
