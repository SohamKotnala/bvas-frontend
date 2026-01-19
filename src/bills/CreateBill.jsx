import { useState } from "react";
import api from "../api/axios";

const DISTRICTS = [
  { code: "UKDD", name: "Dehradun" },
  { code: "UKHR", name: "Haridwar" },
  { code: "UKNA", name: "Nainital" },
  { code: "UKUD", name: "Udham Singh Nagar" },
  { code: "UKAL", name: "Almora" },
  { code: "UKBA", name: "Bageshwar" },
  { code: "UKCH", name: "Chamoli" },
  { code: "UKPA", name: "Pauri Garhwal" },
  { code: "UKPI", name: "Pithoragarh" },
  { code: "UKRU", name: "Rudraprayag" },
  { code: "UKTE", name: "Tehri Garhwal" },
  { code: "UKUT", name: "Uttarkashi" },
  { code: "UKCHP", name: "Champawat" },
];

export default function CreateBill({ onCreated }) {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [district, setDistrict] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (month < 1 || month > 12) {
      alert("Month must be between 1 and 12");
      return;
    }

    if (year < 2020) {
      alert("Enter a valid year");
      return;
    }

    setLoading(true);

    try {
      await api.post("/vendor/bills", {
        month: Number(month),
        year: Number(year),
        district_code: district,
      });

      alert("Bill created successfully");
      setMonth("");
      setYear("");
      setDistrict("");
      onCreated();
    } catch (_err) {
      alert(err.response?.data?.message || "Failed to create bill");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="section">
      <h2>Create New Bill</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 2fr auto",
          gap: "12px",
          alignItems: "end",
        }}
      >
        {/* Month */}
        <div>
          <label style={{ fontSize: "13px", fontWeight: "600" }}>
            Month
          </label>
          <input
            type="number"
            placeholder="1–12"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            min="1"
            max="12"
            required
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </div>

        {/* Year */}
        <div>
          <label style={{ fontSize: "13px", fontWeight: "600" }}>
            Year
          </label>
          <input
            type="number"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </div>

        {/* District */}
        <div>
          <label style={{ fontSize: "13px", fontWeight: "600" }}>
            District
          </label>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          >
            <option value="">Select District</option>
            {DISTRICTS.map((d) => (
              <option key={d.code} value={d.code}>
                {d.name} ({d.code})
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
          style={{ height: "38px" }}
        >
          {loading ? "Creating..." : "Create Bill"}
        </button>
      </form>
    </div>
  );
}
