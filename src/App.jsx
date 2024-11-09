import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Sidebar from "./components/custom/Sidebar";
import Header from "./components/custom/Header";
import Dashboard from "./components/custom/Dashboard";
import Inventory from "./components/custom/Inventory";
import Redistribution from "./components/custom/Redistribution";
import ProductInfo from "./components/custom/ProductInfo";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const userType = localStorage.getItem("userType");

  const ProtectedRouteLayout = ({ children }) => (
    <div className="flex  h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-auto">
        <Header />
        <main className="p-4 bg-gray-100 flex-1">{children}</main>
      </div>
    </div>
  );

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/register"
          element={
            isLoggedIn ? <Navigate to="/dashboard" replace /> : <Register />
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <ProtectedRouteLayout>
                <Dashboard />
              </ProtectedRouteLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/inventory"
          element={
            isLoggedIn ? (
              <ProtectedRouteLayout>
                <Inventory />
              </ProtectedRouteLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/inventory/productsdata"
          element={
            isLoggedIn ? (
              <ProtectedRouteLayout>
                <ProductInfo />
              </ProtectedRouteLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path={userType === "supplier" ? "/product_request" : "/add_inventory"}
          element={
            isLoggedIn ? (
              <ProtectedRouteLayout>
                <Redistribution />
              </ProtectedRouteLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
