import Header from "./Header";
import Sidebar from "./Sidebar";
import { getUser } from "../utils/auth";
import "./layout.css";

export default function AppLayout({ children }) {
  const user = getUser();

  return (
    <div className="app-container">
      <Sidebar user={user} />

      <div className="app-main">
        <Header user={user} />
        <main className="app-content">{children}</main>
      </div>
    </div>
  );
}
