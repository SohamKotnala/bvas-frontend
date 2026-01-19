import { NavLink } from "react-router-dom";
import "./layout.css";

export default function Sidebar({ user }) {
  const role = user.role;

  return (
    <aside className="app-sidebar">
      <div className="sidebar-section">
        <div className="sidebar-title">Navigation</div>

        {/* ===================== */}
        {/* Vendor Menu */}
        {/* ===================== */}
        {role === "VENDOR" && (
          <ul className="sidebar-menu">
            <li>
              <NavLink to="/vendor" className="sidebar-link">
                Dashboard
              </NavLink>
            </li>
          </ul>
        )}

        {/* ===================== */}
        {/* District Verifier Menu */}
        {/* ===================== */}
        {role === "DISTRICT_VERIFIER" && (
          <ul className="sidebar-menu">
            <li>
              <NavLink to="/verifier" className="sidebar-link">
                District Bills
              </NavLink>
            </li>
          </ul>
        )}

        {/* ===================== */}
        {/* HQ Admin Menu */}
        {/* ===================== */}
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
