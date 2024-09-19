// src/components/Dashboard.js
import React from "react";
import Cards from "./Cards";
import Table from "./Table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const Dashboard = () => {
  // Mock data for charts
  const salesData = [
    { month: "Jan", sales: 4000, profit: 2400 },
    { month: "Feb", sales: 3000, profit: 1398 },
    { month: "Mar", sales: 5000, profit: 9800 },
    { month: "Apr", sales: 4000, profit: 3908 },
    { month: "May", sales: 6000, profit: 4800 },
    { month: "Jun", sales: 7000, profit: 3800 },
    { month: "Jul", sales: 8000, profit: 4300 },
    { month: "Aug", sales: 5000, profit: 5400 },
    { month: "Sep", sales: 4000, profit: 3200 },
    { month: "Oct", sales: 6000, profit: 5300 },
    { month: "Nov", sales: 7000, profit: 5700 },
    { month: "Dec", sales: 8000, profit: 6900 },
  ];

  return (
    <div>
      <Cards />
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Overview with Bar Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#FF7F50" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Profit Overview with Line Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Profit Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table placed under the charts */}
      <div className="mt-6">
        <Table />
      </div>
    </div>
  );
};

export default Dashboard;
