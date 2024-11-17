import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { useState, useEffect } from "react";

import { useGetSavedProductsDataSupplierMutation } from "@/services/common";
import { useGetCompletedTransferTaskCounMutation } from "@/services/common";
import { useGetRetailerForSupplierMutation } from "@/services/common";
import { useGetDriverDetailsMutation } from "@/services/common";
const SupplierDashboard = () => {
  const supplierEmail = localStorage.getItem("email");

  const [getSavedProductsDataSupplier, { isLoading }] =
    useGetSavedProductsDataSupplierMutation();
  const [getCompletedTransferTaskCount, { isCountLoading }] =
    useGetCompletedTransferTaskCounMutation();
  const [getRetailerForSupplierMutation, { isRetailerLoading }] =
    useGetRetailerForSupplierMutation();

  const [GetDriverDetailsCount, { isDriverLoading }] =
    useGetDriverDetailsMutation();

  const [
    getSavedProductsDataSupplierResponse,
    setGetSavedProductsDataSupplierResponse,
  ] = useState([]);

  const [
    getCompletedTransferTaskCountResponse,
    setgetCompletedTransferTaskCountResponse,
  ] = useState([]);

  const [retailerData, setRetailerData] = useState([]);

  const [totalDriver, setTotalDriver] = useState([]);

  useEffect(() => {
    getSavedProductsDataSupplier({ supplierEmail }).then((response) => {
      setGetSavedProductsDataSupplierResponse(response.data);
    });
  }, [getSavedProductsDataSupplier]);

  useEffect(() => {
    getCompletedTransferTaskCount({ supplierEmail }).then((response) => {
      setgetCompletedTransferTaskCountResponse(
        response.data.completedTaskCount
      );
    });
  }, [getCompletedTransferTaskCount]);

  useEffect(() => {
    if (supplierEmail) {
      getRetailerForSupplierMutation({ supplierEmail })
        .unwrap()
        .then((response) => {
          const dataArray = Array.isArray(response) ? response : [response];

          setRetailerData(dataArray.length);
        })
        .catch((error) => console.error("Error fetching retailers:", error));
    } else {
      console.error("No supplier email found in localStorage.");
    }
  }, [getRetailerForSupplierMutation]);

  useEffect(() => {
    if (supplierEmail) {
      GetDriverDetailsCount({ supplierEmail })
        .unwrap()
        .then((response) => {
          const dataArray = Array.isArray(response) ? response : [response];

          setTotalDriver(dataArray.length);
        })
        .catch((error) => console.error("Error fetching retailers:", error));
    } else {
      console.error("No supplier email found in localStorage.");
    }
  }, [GetDriverDetailsCount]);

  console.log("len driver is ", totalDriver);

  const productSaved =
    getSavedProductsDataSupplierResponse.totalProductsCountSaved;
  const moneySaved = getSavedProductsDataSupplierResponse.totalRevenueGenerated;

  const cardData = {
    productsSavedFromExpiring: 0,
    moneySavedByProducts: 0,
    monthlyRevenue: 0,
    monthlySales: 0,
    totalRevenue: 0,
    totalSales: 0,
  };

  const data = [
    {
      name: "Page A",
      Revenue: 4000,
    },
    {
      name: "Page B",
      Revenue: 3000,
    },
    {
      name: "Page C",
      Revenue: 2000,
    },
    {
      name: "Page D",
      Revenue: 2780,
    },
    {
      name: "Page E",
      Revenue: 1890,
    },
  ];
  return (
    <div className="p-6 bg-white min-h-screen rounded-xl ">
      {/* cards Data  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4  ">
        <div className="bg-white p-4 rounded shadow bg-gradient-to-r from-[#ffe2e6] to-[#f7d7e3]">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-md">
              Total Products Saved From expiring in Units
            </h3>
          </div>
          <div className="text-2xl font-semibold">{productSaved}</div>
        </div>
        <div className="bg-white p-4 rounded shadow bg-gradient-to-r from-[#fff4de] to-[#fef1c7]">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Money Saved By Redistribution</h3>
          </div>
          <div className="text-2xl font-semibold"> ₹{moneySaved}</div>
        </div>
        <div className="bg-white p-4 rounded shadow bg-gradient-to-r from-[#dcfce7] to-[#f0fdf4]">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Total Completed Request</h3>
          </div>
          <div className="text-2xl font-semibold">
            {getCompletedTransferTaskCountResponse}
          </div>
        </div>
        <div
          className="bg-white p-4 rounded shadow bg-gradient-to-r from-purple-300 to-purple-100
"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Total Connected Retailers</h3>
          </div>
          <div className="text-2xl font-semibold">{retailerData}</div>
        </div>
        <div className="bg-white p-4 rounded shadow bg-gradient-to-r from-[#b7e6fa] to-[#ffffff]">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Total Connected Drivers</h3>
          </div>
          <div className="text-2xl font-semibold">{totalDriver}</div>
        </div>
      </div>

      {/* Table Data */}
      <div className="bg-white p-4 rounded shadow bg-gradient-to-r from-[#fff1f1] to-[#f7e4e4] mt-6">
        <h2 className="text-xl font-semibold">Product Details</h2>
        <table className="w-full mt-4">
          <thead>
            <tr>
              <th className="text-left">Product Name</th>
              <th className="text-left">Expiry Date</th>
              <th className="text-left">Quantity</th>
              <th className="text-left">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Product 1</td>
              <td>12/12/2021</td>
              <td>20</td>
              <td>₹200</td>
            </tr>
            <tr>
              <td>Product 2</td>
              <td>12/12/2021</td>
              <td>20</td>
              <td>₹200</td>
            </tr>
            <tr>
              <td>Product 3</td>
              <td>12/12/2021</td>
              <td>20</td>
              <td>₹200</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Graph Data */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow bg-gradient-to-r from-[#f1f1f1] to-[#e4e4e4] mt-6">
          <h2 className="text-xl font-semibold">Revenue Graph</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <XAxis dataKey="name" stroke="#5550bd" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="Revenue"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded shadow bg-gradient-to-r from-[#f1f1f1] to-[#e4e4e4] mt-6">
          <h2 className="text-xl font-semibold">Revenue Bar Graph</h2>

          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#5550bd" />

              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Revenue" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboard;
