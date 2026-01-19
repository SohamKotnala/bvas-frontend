import { useEffect, useState } from "react";
import api from "../api/axios";
import CreateBill from "../bills/CreateBill";
import BillDetails from "../bills/BillDetails";
import { logout } from "../utils/auth";

export default function VendorDashboard() {
  const [bills, setBills] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadBills() {
    try {
      const res = await api.get("/vendor/bills");
      setBills(res.data);
    } catch (_err) {
      alert("Failed to load bills");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBills();
  }, []);

  function handleLogout() {
    logout();
    window.location.href = "/";
  }

  /* ===============================
     BILL DETAILS VIEW
  ================================ */
  if (selectedBill) {
    return (
      <BillDetails
        billId={selectedBill}
        onBack={() => {
          setSelectedBill(null);
          loadBills();
        }}
      />
    );
  }

  return (
    <div>
      <h1 className="page-title">Vendor Dashboard</h1>

      {/* ===============================
          CREATE BILL SECTION
      ================================ */}
      <div className="section">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Your Bills</h2>

          <button
            className="btn btn-primary"
            onClick={() => setShowCreate((prev) => !prev)}
          >
            {showCreate ? "Close" : "Create New Bill"}
          </button>
        </div>

        {showCreate && (
          <div style={{ marginTop: "16px" }}>
            <CreateBill
              onCreated={() => {
                setShowCreate(false);
                loadBills();
              }}
            />
          </div>
        )}

        {/* ===============================
            BILLS TABLE
        ================================ */}
        {loading ? (
          <p>Loading bills...</p>
        ) : bills.length === 0 ? (
          <p>No bills created yet.</p>
        ) : (
          <table style={{ marginTop: "16px" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Month</th>
                <th>Year</th>
                <th>District</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {bills.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.month}</td>
                  <td>{b.year}</td>
                  <td>{b.district_code}</td>
                  <td>
                    <span
                      className={`badge ${b.status?.toLowerCase()}`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setSelectedBill(b.id)}
                    >
                      Open
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
