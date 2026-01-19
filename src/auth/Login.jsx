import { useState } from "react";
import api from "../api/axios";
import { saveAuth } from "../utils/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 async function handleLogin(e) {
  e.preventDefault();
  try {
    const res = await api.post("/auth/login", { username, password });

    const token = res.data.token;
    saveAuth(token);

    const payload = JSON.parse(atob(token.split(".")[1]));
    const role = payload.role;

    if (role === "VENDOR") navigate("/vendor");
    else if (role === "DISTRICT_VERIFIER") navigate("/verifier");
    else navigate("/hq");
  } catch {
    alert("Invalid credentials");
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
        onSubmit={handleLogin}
        style={{
          width: "360px",
          backgroundColor: "#ffffff",
          padding: "24px",
          borderRadius: "4px",
          border: "1px solid #d0d7de",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          BVAS Login
        </h2>

        <div style={{ marginBottom: "14px" }}>
          <label style={{ fontSize: "13px", fontWeight: "600" }}>
            Username
          </label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "4px",
            }}
          />
        </div>

        <div style={{ marginBottom: "18px" }}>
          <label style={{ fontSize: "13px", fontWeight: "600" }}>
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "4px",
            }}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "100%" }}
        >
          Login
        </button>

        <p
          style={{
            marginTop: "14px",
            textAlign: "center",
            fontSize: "13px",
          }}
        >
          New user?{" "}
          <Link to="/signup" style={{ fontWeight: "500" }}>
            Create account
          </Link>
        </p>
      </form>
    </div>
  );
}
