import { useEffect, useState } from "react";
import api from "../api/axios";

const UNITS = ["kg", "quintal", "tonne", "litre", "bag", "packet"];

export default function BillDetails({ billId, onBack }) {
  const [bill, setBill] = useState(null);
  const [items, setItems] = useState([]);
  const [commodity, setCommodity] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg");
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);

  const [rejectionDisplay, setRejectionDisplay] = useState(null);
  const [latestVerifierRemark, setLatestVerifierRemark] = useState(null);

  async function loadBill() {
    try {
      const res = await api.get(`/vendor/bills/${billId}`);
      setBill(res.data.bill);
      setItems(res.data.items || []);
      setRejectionDisplay(res.data.rejection_display || null);
      setLatestVerifierRemark(res.data.latest_verifier_remark || null);
    } catch {
      alert("Failed to load bill details");
    }
  }

  useEffect(() => {
    loadBill();
  }, [billId]);

  const status = bill?.status;

  const canAddItems = status === "DRAFT" || status === "REJECTED";
  const canDeleteSingle = canAddItems;
  const canClearItems = status === "REJECTED";
  const canSubmit = status === "DRAFT";
  const canResubmit = status === "REJECTED";

  async function addItem(e) {
    e.preventDefault();

    if (!canAddItems) {
      alert("Cannot add items in current bill state");
      return;
    }

    setLoading(true);
    try {
      await api.post(`/vendor/bills/${billId}/items`, {
        items: [
          {
            commodity,
            vendor_quantity: Number(quantity),
            unit,
          },
        ],
      });

      setCommodity("");
      setQuantity("");
      setUnit("kg");
      loadBill();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add item");
    } finally {
      setLoading(false);
    }
  }

  async function deleteSingleItem(itemId) {
    if (!canDeleteSingle) return;
    if (!window.confirm("Delete this item?")) return;

    try {
      await api.delete(`/vendor/bills/${billId}/items/${itemId}`);
      loadBill();
    } catch {
      alert("Failed to delete item");
    }
  }

  async function clearAllItems() {
    if (!canClearItems) return;
    if (!window.confirm("Clear all items?")) return;

    try {
      await api.delete(`/vendor/bills/${billId}/items`);
      loadBill();
    } catch {
      alert("Failed to clear items");
    }
  }

  async function submitBill() {
    if (items.length === 0) {
      alert("Add at least one item");
      return;
    }

    try {
      await api.post(`/vendor/bills/${billId}/submit`);
      alert("Bill submitted for verification");
      window.location.reload();
    } catch {
      alert("Failed to submit bill");
    }
  }

  async function resubmitBill() {
    if (items.length === 0) {
      alert("Add items before resubmitting");
      return;
    }

    try {
      await api.post(`/vendor/bills/${billId}/resubmit`, {
        remarks: remarks || null,
      });
      alert("Bill resubmitted");
      window.location.reload();
    } catch {
      alert("Failed to resubmit bill");
    }
  }

  return (
    <div>
      <h1 className="page-title">Bill Details</h1>

      {/* ===============================
          BILL SUMMARY
      ================================ */}
      <div className="section">
        <p><strong>Bill ID:</strong> {billId}</p>
        <p><strong>Status:</strong> {status}</p>
        <p><strong>District:</strong> {bill?.district_code}</p>

        {rejectionDisplay && (
          <p><strong>Rejections:</strong> {rejectionDisplay}</p>
        )}

        {latestVerifierRemark && (
          <p style={{ color: "#c62828" }}>
            <strong>Verifier Remark:</strong> {latestVerifierRemark}
          </p>
        )}
      </div>

      {/* ===============================
          ADD ITEM
      ================================ */}
      <div className="section">
        <h2>Add Item</h2>

        <form
          onSubmit={addItem}
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr auto",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <input
            placeholder="Commodity"
            value={commodity}
            onChange={(e) => setCommodity(e.target.value)}
            disabled={!canAddItems}
            required
          />

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            disabled={!canAddItems}
            required
          />

          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            disabled={!canAddItems}
          >
            {UNITS.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>

          <button
            className="btn btn-primary"
            disabled={!canAddItems || loading}
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </form>
      </div>

      {/* ===============================
          ITEMS TABLE
      ================================ */}
      <div className="section">
        <h2>Items</h2>

        {items.length === 0 ? (
          <p>No items added.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Commodity</th>
                <th>Quantity</th>
                <th>Unit</th>
                {canDeleteSingle && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.id}>
                  <td>{i.commodity}</td>
                  <td>{i.vendor_quantity}</td>
                  <td>{i.unit}</td>
                  {canDeleteSingle && (
                    <td>
                      <button
                        className="btn btn-reject"
                        onClick={() => deleteSingleItem(i.id)}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ===============================
          REJECTED FLOW
      ================================ */}
      {canClearItems && (
        <div className="section">
          <h2>Resubmission</h2>

          <button
            className="btn btn-secondary"
            onClick={clearAllItems}
          >
            Clear All Items
          </button>

          <br /><br />

          <textarea
            placeholder="Optional resubmission remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            rows={3}
            style={{ width: "100%" }}
          />

          <br /><br />

          <button
            className="btn btn-primary"
            onClick={resubmitBill}
          >
            Resubmit Bill
          </button>
        </div>
      )}

      {/* ===============================
          DRAFT FLOW
      ================================ */}
      {canSubmit && (
        <div className="section">
          <button
            className="btn btn-primary"
            onClick={submitBill}
          >
            Submit Bill
          </button>
        </div>
      )}

      <button className="btn btn-secondary" onClick={onBack}>
        Back
      </button>
    </div>
  );
}
