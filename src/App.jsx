import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Sidebar from "./components/custom/Sidebar";
import Header from "./components/custom/Header";
import Dashboard from "./components/custom/Dashboard";
import Inventory from "./components/custom/Inventory";
import Redistribution from "./components/custom/Redistribution";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <>
      <Router>
        {!authenticated ? (
          <Register />
        ) : (
          <div className="flex">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Header />
              <main className="p-4 bg-gray-100 flex-1 overflow-auto">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/redistribution" element={<Redistribution />} />
                </Routes>
              </main>
            </div>
          </div>
        )}
      </Router>
    </>
  );
}

export default App;
