import Header from "./Header";
import Sidebar from "./Sidebar";
import "./layout.css";

export default function AppLayout({ children }) {
  return (
    <div className="app-container">
      <Sidebar />

      <div className="app-main">
        <Header />
        <main className="app-content">
          {children}
        </main>
      </div>
    </div>
  );
}
