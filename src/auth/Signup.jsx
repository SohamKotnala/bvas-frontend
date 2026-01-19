import { useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

const DISTRICTS = [
  { code: "UKDD", name: "Dehradun" },
  { code: "UKHR", name: "Haridwar" },
  { code: "UKNA", name: "Nainital" },
  { code: "UKUS", name: "Udham Singh Nagar" },
  { code: "UKAL", name: "Almora" },
  { code: "UKBA", name: "Bageshwar" },
  { code: "UKCH", name: "Chamoli" },
  { code: "UKPA", name: "Pauri Garhwal" },
  { code: "UKPI", name: "Pithoragarh" },
  { code: "UKRU", name: "Rudraprayag" },
  { code: "UKTE", name: "Tehri Garhwal" },
  { code: "UKUT", name: "Uttarkashi" },
];

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "VENDOR",
    district_code: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.username || !form.password || !form.role) {
      alert("All fields are required");
      return;
    }

    if (form.role === "DISTRICT_VERIFIER" && !form.district_code) {
      alert("District is required for verifier");
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/signup", form);

      alert("User created successfully. Please login.");
      navigate("/");
    } catch (err) {
      console.error("SIGNUP ERROR:", err);

      const message =
        err.response?.data?.message || "Signup failed. Try again.";

      alert(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f6f8",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "380px",
          backgroundColor: "#ffffff",
          padding: "24px",
          borderRadius: "4px",
          border: "1px solid #d0d7de",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Create Account
        </h2>

        {/* Username */}
        <div style={{ marginBottom: "14px" }}>
          <label style={{ fontSize: "13px", fontWeight: "600" }}>
            Username
          </label>
          <input
            type="text"
            placeholder="Enter username"
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "4px",
            }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: "14px" }}>
          <label style={{ fontSize: "13px", fontWeight: "600" }}>
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "4px",
            }}
          />
        </div>

        {/* Role */}
        <div style={{ marginBottom: "14px" }}>
          <label style={{ fontSize: "13px", fontWeight: "600" }}>
            Role
          </label>
          <select
            value={form.role}
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value,
                district_code: "",
              })
            }
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "4px",
            }}
          >
            <option value="VENDOR">Vendor</option>
            <option value="DISTRICT_VERIFIER">District Verifier</option>
            <option value="HQ_ADMIN">HQ Admin</option>
          </select>
        </div>

        {/* District */}
        {form.role === "DISTRICT_VERIFIER" && (
          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600" }}>
              District
            </label>
            <select
              value={form.district_code}
              onChange={(e) =>
                setForm({
                  ...form,
                  district_code: e.target.value,
                })
              }
              required
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "4px",
              }}
            >
              <option value="">Select District</option>
              {DISTRICTS.map((d) => (
                <option key={d.code} value={d.code}>
                  {d.name} ({d.code})
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "100%" }}
          disabled={loading}
        >
          {loading ? "Creating user..." : "Create User"}
        </button>

        <p
          style={{
            marginTop: "14px",
            textAlign: "center",
            fontSize: "13px",
          }}
        >
          Already have an account?{" "}
          <Link to="/" style={{ fontWeight: "500" }}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
