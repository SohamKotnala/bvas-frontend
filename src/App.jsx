import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import VendorDashboard from "./dashboards/VendorDashboard";
import VerifierDashboard from "./dashboards/VerifierDashboard";
import HQDashboard from "./dashboards/HQDashboard";
import HQBillDetails from "./bills/HQBillDetails";
import ProtectedRoute from "./auth/ProtectedRoute";
import AppLayout from "./layout/AppLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Vendor */}
        <Route
          path="/vendor"
          element={
            <ProtectedRoute role="VENDOR">
              <AppLayout>
                <VendorDashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* District Verifier */}
        <Route
          path="/verifier"
          element={
            <ProtectedRoute role="DISTRICT_VERIFIER">
              <AppLayout>
                <VerifierDashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* HQ */}
        <Route
          path="/hq"
          element={
            <ProtectedRoute role="HQ_ADMIN">
              <AppLayout>
                <HQDashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/hq/bills/:billId"
          element={
            <ProtectedRoute role="HQ_ADMIN">
              <AppLayout>
                <HQBillDetails />
              </AppLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
