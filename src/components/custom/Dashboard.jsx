// // src/components/Dashboard.js
// import React, { useEffect, useState } from "react";
// import Cards from "./Cards";
// import Table from "./Table";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   LineChart,
//   Line,
// } from "recharts";

// import { useGetSalesDtaMutation } from "../../services/common/index";

// const Dashboard = () => {
//   const [getSalesData, { isLoading }] = useGetSalesDtaMutation();
//   const [retaileSalesData, setretaileSalesData] = useState([]);
//   const retailerEmail = localStorage.getItem("email");

//   useEffect(() => {
//     try {
//       const response = getSalesData({ retailerEmail })
//         .unwrap()
//         .then((response) => {
//           const dataArray = Array.isArray(response) ? response : [response];

//           setretaileSalesData(dataArray);
//         })
//         .catch((error) => console.error("Error fetching retailers:", error));
//     } catch (error) {
//       console.error(`No supplier data found ${error}`);
//     }
//   }, [getSalesData]);

//   console.log("retaileSalesData", retaileSalesData);

//   const salesData = [
//     { month: "Jan", sales: 4000, profit: 2400 },
//     { month: "Feb", sales: 3000, profit: 1398 },
//     { month: "Mar", sales: 5000, profit: 9800 },
//     { month: "Apr", sales: 4000, profit: 3908 },
//     { month: "May", sales: 6000, profit: 4800 },
//     { month: "Jun", sales: 7000, profit: 3800 },
//     { month: "Jul", sales: 8000, profit: 4300 },
//     { month: "Aug", sales: 5000, profit: 5400 },
//     { month: "Sep", sales: 4000, profit: 3200 },
//     { month: "Oct", sales: 6000, profit: 5300 },
//     { month: "Nov", sales: 7000, profit: 5700 },
//     { month: "Dec", sales: 8000, profit: 6900 },
//   ];

//   return (
//     <div>
//       <Cards />
//       <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Sales Overview with Bar Chart */}
//         <div className="bg-white p-4 rounded shadow">
//           <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={salesData}>
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="sales" fill="#FF7F50" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Profit Overview with Line Chart */}
//         <div className="bg-white p-4 rounded shadow">
//           <h2 className="text-lg font-semibold mb-4">Profit Overview</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={salesData}>
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey="profit"
//                 stroke="#8884d8"
//                 strokeWidth={2}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Table placed under the charts */}
//       <div className="mt-6">
//         <Table />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
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
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import { useGetSalesDtaMutation } from "../../services/common/index";

const Dashboard = () => {
  const [getSalesData, { isLoading }] = useGetSalesDtaMutation();
  const [retaileSalesData, setretaileSalesData] = useState(null);
  const retailerEmail = localStorage.getItem("email");

  useEffect(() => {
    try {
      getSalesData({ retailerEmail })
        .unwrap()
        .then((response) => {
          setretaileSalesData(response);
        })
        .catch((error) => console.error("Error fetching retailers:", error));
    } catch (error) {
      console.error(`No supplier data found ${error}`);
    }
  }, [getSalesData]);

  if (isLoading || !retaileSalesData) {
    return <div>Loading...</div>;
  }

  // console.log(retaileSalesData);
  const { monthlySales, monthlyRevenue, topSellingProducts, salesByProduct } =
    retaileSalesData;

  const salesData = Object.keys(monthlySales).map((month) => ({
    month,
    sales: monthlySales[month],
    revenue: monthlyRevenue[month],
  }));

  const salesByProductData = Object.entries(salesByProduct).map(
    ([product, sales]) => ({
      product,
      sales,
    })
  );

  const topSellingProductsData = topSellingProducts
    .map(([product, quantity]) => ({
      product,
      quantity,
    }))
    .slice(0, 5);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Calculate totals for cards
  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth() + 1;
  const monthYearDate = `${currentMonth}-${currentYear}`;

  const totalSales = salesData.reduce((acc, curr) => acc + curr.sales, 0);
  const totalRevenue = salesData.reduce((acc, curr) => acc + curr.revenue, 0);
  const monthlySalesValue = monthlySales[monthYearDate] || 0;
  const monthlyRevenueValue = monthlyRevenue[monthYearDate] || 0;

  return (
    <div>
      <Cards
        salesData={{
          totalSales,
          totalRevenue,
          monthlySales: monthlySalesValue,
          monthlyRevenue: monthlyRevenueValue,
        }}
      />
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

        {/* Revenue Overview with Line Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-1 gap-6">
        {/* Sales by Product with Line Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Sales by Product</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesByProductData}>
              <XAxis dataKey="product" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#82ca9d"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* Top Selling Products with Horizontal Bar Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Top 5 Selling Products</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={topSellingProductsData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis type="number" />
              <YAxis type="category" dataKey="product" />
              <Tooltip />
              <Legend />
              <Bar dataKey="quantity" fill="#8884d8">
                {topSellingProductsData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
