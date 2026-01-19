import { useEffect, useState } from "react";
import api from "../api/axios";

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
    } catch (err) {
      console.error("LOAD PENDING BILLS ERROR:", err);
      alert(
        err.response?.data?.message ||
          "Failed to load pending bills"
      );
    } finally {
      setLoading(false);
    }
  }

  async function loadBillDetails(billId) {
    try {
      const res = await api.get(`/vendor/bills/${billId}`);
      setBillDetails(res.data);
    } catch (err) {
      console.error("LOAD BILL DETAILS ERROR:", err);
      alert(
        err.response?.data?.message ||
          "Failed to load bill details"
      );
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
      alert("Bill approved successfully");
      setExpandedBill(null);
      setBillDetails(null);
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
        action: "REJECTED",
        remarks,
      });

      alert("Bill rejected successfully");

      setRemarksMap((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });

      setExpandedBill(null);
      setBillDetails(null);
      loadBills();
    } catch (err) {
      alert(err.response?.data?.message || "Rejection failed");
    }
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
                <th>ID</th>
                <th>Month</th>
                <th>Year</th>
                <th>Vendor</th>
                <th>Rejections</th>
                <th>Vendor Remark</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {bills.map((b) => (
                <tbody key={b.id}>
                  <tr>
                    <td>{b.id}</td>
                    <td>{b.month}</td>
                    <td>{b.year}</td>
                    <td>{b.vendor_name}</td>
                    <td>{b.rejection_count ?? 0} / 5</td>
                    <td>{b.latest_vendor_remark || <em>—</em>}</td>
                    <td>
                      <div style={{ marginBottom: "8px" }}>
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
                          style={{ marginLeft: "8px" }}
                        >
                          Approve
                        </button>
                      </div>

                      <div style={{ display: "flex", gap: "8px" }}>
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

                  {expandedBill === b.id && billDetails && (
                    <tr>
                      <td colSpan="7">
                        <div className="section">
                          <h2>Bill Items</h2>

                          {billDetails.items.length === 0 ? (
                            <p>No items</p>
                          ) : (
                            <table>
                              <thead>
                                <tr>
                                  <th>Commodity</th>
                                  <th>Vendor Qty</th>
                                  <th>Unit</th>
                                  <th>EPOS Qty</th>
                                  <th>Difference</th>
                                </tr>
                              </thead>
                              <tbody>
                                {billDetails.items.map((i) => (
                                  <tr key={i.id}>
                                    <td>{i.commodity}</td>
                                    <td>{i.vendor_quantity}</td>
                                    <td>{i.unit}</td>
                                    <td>{i.epos_quantity}</td>
                                    <td>{i.difference}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
