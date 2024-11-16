import React from "react";
import Cards from "../../components/custom/Cards";

const SupplierDashboard = () => {
  const cardData = {
    productsSavedFromExpiring: 0,
    moneySavedByProducts: 0,
    productsSavedFromExpiring: 0,
    moneySavedByProducts: 0,
    totalRevenue: 0,
    totalSales: 0,
  };
  return (
    <div className="p-6 bg-white min-h-screen rounded-xl ">
      {/* cards Data  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4  ">
        <div className="bg-white p-4 rounded shadow bg-gradient-to-r from-[#ffe2e6] to-[#f7d7e3]">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-md">
              Total Products Saved From expiring in Units
            </h3>
          </div>
          <div className="text-2xl font-semibold">
            {cardData.productsSavedFromExpiring}
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow bg-gradient-to-r from-[#fff4de] to-[#fef1c7]">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Money Saved By Redistribution</h3>
          </div>
          <div className="text-2xl font-semibold">
            {" "}
            ₹{cardData.moneySavedByProducts}
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow bg-gradient-to-r from-[#dcfce7] to-[#f0fdf4]">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Total Sales in Units</h3>
          </div>
          <div className="text-2xl font-semibold">{cardData.totalSales}</div>
        </div>
        <div
          className="bg-white p-4 rounded shadow bg-gradient-to-r from-purple-300 to-purple-100
"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Total Revenue</h3>
          </div>
          <div className="text-2xl font-semibold">₹{cardData.totalRevenue}</div>
        </div>
        <div className="bg-white p-4 rounded shadow bg-gradient-to-r from-[#b7e6fa] to-[#ffffff]">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Monthly Sales in Units</h3>
          </div>
          <div className="text-2xl font-semibold">{cardData.monthlySales}</div>
        </div>
        <div className="bg-white p-4 rounded shadow bg-gradient-to-r from-[#f4e8ff] to-[#ffffff]">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Monthly Revenue</h3>
          </div>
          <div className="text-2xl font-semibold">
            ₹{cardData.monthlyRevenue}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboard;
