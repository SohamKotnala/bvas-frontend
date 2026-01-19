import { useEffect, useState } from "react";
import api from "../api/axios";
import { logout } from "../utils/auth";

export default function VerifierDashboard() {
  const [bills, setBills] = useState([]);
  const [remarksMap, setRemarksMap] = useState({});
  const [expandedBill, setExpandedBill] = useState(null);
  const [billDetails, setBillDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadBills() {
    try {
      const res = await api.get("/verifier/bills/pending");
      setBills(res.data);
    } catch {
      alert("Failed to load pending bills");
    } finally {
      setLoading(false);
    }
  }

  async function loadBillDetails(billId) {
    try {
      const res = await api.get(`/vendor/bills/${billId}`);
      setBillDetails(res.data);
    } catch {
      alert("Failed to load bill details");
    }
  }

  useEffect(() => {
    loadBills();
  }, []);

  async function approveBill(id) {
    try {
      await api.post(`/verifier/bills/${id}/action`, {
        action: "APPROVE",
      });
      alert("Bill approved");
      setExpandedBill(null);
      loadBills();
    } catch (err) {
      alert(err.response?.data?.message || "Approval failed");
    }
  }

  async function rejectBill(id) {
    const remarks = remarksMap[id];

    if (!remarks) {
      alert("Remarks are required to reject a bill");
      return;
    }

    try {
      await api.post(`/verifier/bills/${id}/action`, {
        action: "REJECT",
        remarks,
      });
      alert("Bill rejected");

      setRemarksMap((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });

      setExpandedBill(null);
      loadBills();
    } catch (err) {
      alert(err.response?.data?.message || "Rejection failed");
    }
  }

  function handleLogout() {
    logout();
    window.location.href = "/";
  }

  return (
    <div>
      <h1 className="page-title">District Verifier Dashboard</h1>

      <div className="section">
        <h2>Pending Bills</h2>

        {loading ? (
          <p>Loading pending bills...</p>
        ) : bills.length === 0 ? (
          <p>No pending bills for your district.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}>ID</th>
                <th style={{ textAlign: "center" }}>Month</th>
                <th style={{ textAlign: "right" }}>Year</th>
                <th style={{ textAlign: "left" }}>Vendor</th>
                <th style={{ textAlign: "center" }}>Rejections</th>
                <th style={{ textAlign: "left" }}>Vendor Remark</th>
                <th style={{ textAlign: "left" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {bills.map((b) => (
                <>
                  <tr key={b.id}>
                    <td style={{ textAlign: "left" }}>{b.id}</td>
                    <td style={{ textAlign: "center" }}>{b.month}</td>
                    <td style={{ textAlign: "right" }}>{b.year}</td>
                    <td style={{ textAlign: "left" }}>{b.vendor_name}</td>
                    <td style={{ textAlign: "center" }}>
                      {b.rejection_count ?? 0} / 5
                    </td>
                    <td style={{ textAlign: "left" }}>
                      {b.latest_vendor_remark ? (
                        b.latest_vendor_remark
                      ) : (
                        <em>—</em>
                      )}
                    </td>
                    <td>
                      {/* View + Approve */}
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          marginBottom: "8px",
                        }}
                      >
                        <button
                          className="btn btn-secondary"
                          onClick={async () => {
                            if (expandedBill === b.id) {
                              setExpandedBill(null);
                              setBillDetails(null);
                            } else {
                              setExpandedBill(b.id);
                              await loadBillDetails(b.id);
                            }
                          }}
                        >
                          {expandedBill === b.id
                            ? "Hide Details"
                            : "View Details"}
                        </button>

                        <button
                          className="btn btn-approve"
                          onClick={() => approveBill(b.id)}
                        >
                          Approve
                        </button>
                      </div>

                      {/* Reject + Remarks */}
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="text"
                          placeholder="Rejection remarks"
                          value={remarksMap[b.id] || ""}
                          onChange={(e) =>
                            setRemarksMap((prev) => ({
                              ...prev,
                              [b.id]: e.target.value,
                            }))
                          }
                          style={{
                            flex: 1,
                            padding: "6px",
                          }}
                        />

                        <button
                          className="btn btn-reject"
                          onClick={() => rejectBill(b.id)}
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* EXPANDED BILL DETAILS */}
                  {expandedBill === b.id && billDetails && (
                    <tr>
                      <td colSpan="7">
                        <div className="section">
                          <h2>Bill Items (EPOS vs Vendor)</h2>

                          <table>
                            <thead>
                              <tr>
                                <th style={{ textAlign: "left" }}>
                                  Commodity
                                </th>
                                <th style={{ textAlign: "right" }}>
                                  Vendor Qty
                                </th>
                                <th style={{ textAlign: "center" }}>Unit</th>
                                <th style={{ textAlign: "right" }}>
                                  EPOS Qty
                                </th>
                                <th style={{ textAlign: "right" }}>
                                  Difference
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {billDetails.items.length === 0 ? (
                                <tr>
                                  <td colSpan="5">No items</td>
                                </tr>
                              ) : (
                                billDetails.items.map((i) => (
                                  <tr key={i.id}>
                                    <td style={{ textAlign: "left" }}>
                                      {i.commodity}
                                    </td>
                                    <td style={{ textAlign: "right" }}>
                                      {i.vendor_quantity}
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                      {i.unit}
                                    </td>
                                    <td style={{ textAlign: "right" }}>
                                      {i.epos_quantity}
                                    </td>
                                    <td style={{ textAlign: "right" }}>
                                      {i.difference}
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
