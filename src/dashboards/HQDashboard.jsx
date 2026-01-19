import { useEffect, useState } from "react";
import api from "../api/axios";
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function HQDashboard() {
  const [summary, setSummary] = useState(null);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function loadDashboard() {
    try {
      const summaryRes = await api.get("/hq/dashboard");
      const billsRes = await api.get("/hq/bills");

      setSummary(summaryRes.data);
      setBills(billsRes.data);
    } catch (err) {
      alert("Failed to load HQ dashboard data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  async function lockBill(billId) {
    if (!window.confirm("Are you sure you want to lock this bill?")) return;

    try {
      await api.post(`/hq/bills/${billId}/lock`, {
        reason: "Locked by HQ",
      });
      alert("Bill locked successfully");
      loadDashboard();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to lock bill");
    }
  }

  async function unlockBill(billId) {
    if (!window.confirm("Are you sure you want to unlock this bill?")) return;

    try {
      await api.post(`/hq/bills/${billId}/unlock`);
      alert("Bill unlocked successfully");
      loadDashboard();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to unlock bill");
    }
  }

  function handleLogout() {
    logout();
    window.location.href = "/";
  }

  if (loading) return <p>Loading HQ dashboard...</p>;
  if (!summary) return <p>No data available</p>;

  return (
    <div>
      <h1 className="page-title">HQ Admin Dashboard</h1>

      {/* ===============================
          SYSTEM SUMMARY
      ================================ */}
      <div className="section">
        <h2>System Summary</h2>

        <table>
          <thead>
            <tr>
              <th>Metric</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Pending Bills</td>
              <td>{summary.pending}</td>
            </tr>
            <tr>
              <td>Approved Bills</td>
              <td>{summary.approved}</td>
            </tr>
            <tr>
              <td>Rejected Bills</td>
              <td>{summary.rejected}</td>
            </tr>
            <tr>
              <td>Locked Bills</td>
              <td>{summary.locked}</td>
            </tr>
            <tr>
              <td>Total Vendors</td>
              <td>{summary.total_vendors}</td>
            </tr>
            <tr>
              <td>Total Verifiers</td>
              <td>{summary.total_verifiers}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ===============================
          ALL BILLS
      ================================ */}
      <div className="section">
        <h2>All Bills</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Month</th>
              <th>Year</th>
              <th>Vendor</th>
              <th>Status</th>
              <th>Rejections</th>
              <th>Verifier</th>
              <th>Locked</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {bills.length === 0 ? (
              <tr>
                <td colSpan="9">No bills found</td>
              </tr>
            ) : (
              bills.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.month}</td>
                  <td>{b.year}</td>
                  <td>{b.vendor_name}</td>
                  <td>
                    <span className={`badge ${b.status?.toLowerCase()}`}>
                      {b.status}
                    </span>
                  </td>
                  <td>{(b.rejection_count ?? 0)} / 5</td>
                  <td>{b.verifier_name || "—"}</td>
                  <td>{b.is_locked ? "Yes" : "No"}</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        className="btn btn-secondary"
                        onClick={() => navigate(`/hq/bills/${b.id}`)}
                      >
                        View
                      </button>

                      {!b.is_locked && (
                        <button
                          className="btn btn-reject"
                          onClick={() => lockBill(b.id)}
                        >
                          Lock
                        </button>
                      )}

                      {b.is_locked && (
                        <button
                          className="btn btn-approve"
                          onClick={() => unlockBill(b.id)}
                        >
                          Unlock
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
