import React, { useState, useEffect } from "react";

const Cards = ({ salesData }) => {
  const [cardData, setCardData] = useState({
    totalSales: 0,
    totalRevenue: 0,
    monthlySales: 0,
    monthlyRevenue: 0,
    productsSavedFromExpiring: 0,
    moneySavedByProducts: 0,
  });

  useEffect(() => {
    if (salesData) {
      const {
        totalSales,
        totalRevenue,
        monthlySales,
        monthlyRevenue,
        productsSavedFromExpiring,
        moneySavedByProducts,
      } = salesData;
      setCardData({
        totalSales,
        totalRevenue,
        monthlySales,
        monthlyRevenue,
        productsSavedFromExpiring,
        moneySavedByProducts,
      });
    }
  }, [salesData]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4  ">
      <div
        className="bg-white p-4 rounded shadow bg-gradient-to-r from-[#ffe2e6] to-[#f7d7e3]

"
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-md">
            Total Products Saved From expiring in Units
          </h3>
        </div>
        <div className="text-2xl font-semibold">
          {cardData.productsSavedFromExpiring}
        </div>
      </div>
      <div
        className="bg-white p-4 rounded shadow bg-gradient-to-r from-[#fff4de] to-[#fef1c7]

"
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Money Saved By Redistribution</h3>
        </div>
        <div className="text-2xl font-semibold">
          {" "}
          ₹{cardData.moneySavedByProducts}
        </div>
      </div>
      <div
        className="bg-white p-4 rounded shadow bg-gradient-to-r from-[#dcfce7] to-[#f0fdf4]

"
      >
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
        <div className="text-2xl font-semibold">
          ₹{cardData.totalRevenue.toLocaleString()}
        </div>
      </div>
      <div
        className="bg-white p-4 rounded shadow bg-gradient-to-r from-[#b7e6fa] to-[#ffffff]

"
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Monthly Sales in Units</h3>
        </div>
        <div className="text-2xl font-semibold">{cardData.monthlySales}</div>
      </div>
      <div
        className="bg-white p-4 rounded shadow bg-gradient-to-r from-[#f4e8ff] to-[#ffffff]

"
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Monthly Revenue</h3>
        </div>
        <div className="text-2xl font-semibold">
          ₹{cardData.monthlyRevenue.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default Cards;
