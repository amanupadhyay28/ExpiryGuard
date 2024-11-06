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

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Register />
            )
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <div className="flex">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Header />
                  <main className="p-4 bg-gray-100 flex-1 overflow-auto">
                    <Dashboard />
                  </main>
                </div>
              </div>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/inventory"
          element={
            isAuthenticated ? <Inventory /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/redistribution"
          element={
            isAuthenticated ? <Redistribution /> : <Navigate to="/" replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
