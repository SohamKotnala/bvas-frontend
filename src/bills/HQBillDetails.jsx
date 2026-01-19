import { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";

export default function HQBillDetails() {
  const { billId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    loadBill();
  }, [billId]);

  async function loadBill() {
    try {
      const res = await api.get(`/hq/bills/${billId}`);
      setData(res.data);
    } catch (_err) {
      alert("Failed to load bill details");
    }
  }

  async function unlockBill() {
    if (!window.confirm("Unlock this bill?")) return;

    try {
      await api.post(`/hq/bills/${billId}/unlock`);
      alert("Bill unlocked");
      loadBill();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to unlock bill");
    }
  }

  if (!data) return <p>Loading bill details...</p>;

  const { bill, items = [], actions = [], rejection_display } = data;

  return (
    <div>
      <h1 className="page-title">HQ Bill Details</h1>

      {/* ===============================
          BILL SUMMARY
      ================================ */}
      <div className="section">
        <p><strong>Bill ID:</strong> {bill.id}</p>
        <p><strong>Vendor:</strong> {bill.vendor_name}</p>
        <p><strong>Status:</strong> {bill.status}</p>
        <p><strong>District:</strong> {bill.district_code}</p>
        <p><strong>Rejections:</strong> {rejection_display}</p>
        <p><strong>Locked:</strong> {bill.is_locked ? "Yes" : "No"}</p>
      </div>

      {/* ===============================
          BILL ITEMS
      ================================ */}
      <div className="section">
        <h2>Items (EPOS vs Vendor)</h2>

        {items.length === 0 ? (
          <p>No items</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Commodity</th>
                <th>Vendor Qty</th>
                <th>EPOS Qty</th>
                <th>Difference</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i, idx) => (
                <tr key={idx}>
                  <td>{i.commodity}</td>
                  <td>
                    {i.vendor_quantity} {i.unit}
                  </td>
                  <td>{i.epos_quantity}</td>
                  <td>{i.difference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ===============================
          AUDIT TRAIL
      ================================ */}
      <div className="section">
        <h2>Audit Trail</h2>

        {actions.length === 0 ? (
          <p>No actions yet</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Role</th>
                <th>Action</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {actions.map((a, idx) => (
                <tr key={idx}>
                  <td>
                    {new Date(a.created_at).toLocaleString()}
                  </td>
                  <td>{a.role}</td>
                  <td>{a.action}</td>
                  <td>{a.remarks || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ===============================
          HQ ACTIONS
      ================================ */}
      <div className="section">
        <h2>HQ Actions</h2>

        {bill.is_locked ? (
          <button
            className="btn btn-approve"
            onClick={unlockBill}
          >
            Unlock Bill
          </button>
        ) : (
          <p>This bill is currently unlocked.</p>
        )}
      </div>

      <button
        className="btn btn-secondary"
        onClick={() => navigate("/hq")}
      >
        Back
      </button>
    </div>
  );
}
