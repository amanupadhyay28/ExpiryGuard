// src/components/Cards.js
import React, { useState } from 'react';

const Cards = () => {
  const [timeframe, setTimeframe] = useState('monthly');

  // Mock data
  const mockData = {
    totalSales: {
      monthly: 50000,
      yearly: 600000,
    },
    totalProfit: {
      monthly: 15000,
      yearly: 180000,
    },
    totalCostSaved: {
      monthly: 8000,
      yearly: 96000,
    },
  };

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
  };

  const cardData = [
    {
      title: 'Total Sales',
      value: `$${mockData.totalSales[timeframe].toLocaleString()}`,
    },
    {
      title: 'Total Profit',
      value: `$${mockData.totalProfit[timeframe].toLocaleString()}`,
    },
    {
      title: 'Total Cost Saved',
      value: `$${mockData.totalCostSaved[timeframe].toLocaleString()}`,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1 bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Total Sales</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => handleTimeframeChange('monthly')}
              className={`px-2 py-1 rounded ${
                timeframe === 'monthly' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => handleTimeframeChange('yearly')}
              className={`px-2 py-1 rounded ${
                timeframe === 'yearly' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Yearly
            </button>
          </div>
        </div>
        <div className="text-2xl font-semibold">{cardData[0].value}</div>
      </div>
      <div className="flex-1 bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Total Profit</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => handleTimeframeChange('monthly')}
              className={`px-2 py-1 rounded ${
                timeframe === 'monthly' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => handleTimeframeChange('yearly')}
              className={`px-2 py-1 rounded ${
                timeframe === 'yearly' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Yearly
            </button>
          </div>
        </div>
        <div className="text-2xl font-semibold">{cardData[1].value}</div>
      </div>
      <div className="flex-1 bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Total Cost Saved</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => handleTimeframeChange('monthly')}
              className={`px-2 py-1 rounded ${
                timeframe === 'monthly' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => handleTimeframeChange('yearly')}
              className={`px-2 py-1 rounded ${
                timeframe === 'yearly' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Yearly
            </button>
          </div>
        </div>
        <div className="text-2xl font-semibold">{cardData[2].value}</div>
      </div>
    </div>
  );
};

export default Cards;
