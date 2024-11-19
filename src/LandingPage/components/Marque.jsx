import React from "react";
import "./Marque.css";

const MarqueeCarousel = () => {
  const customers = [
    { name: "RetailCorp", logo: "https://via.placeholder.com/100x50" },
    { name: "SupplyPro", logo: "https://via.placeholder.com/100x50" },
    { name: "QuickShop", logo: "https://via.placeholder.com/100x50" },
    { name: "LogiMax", logo: "https://via.placeholder.com/100x50" },
    { name: "ShelfEase", logo: "https://via.placeholder.com/100x50" },
    { name: "WareSmart", logo: "https://via.placeholder.com/100x50" },
  ];

  return (
    <section className="py-10 bg-gray-50">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Trusted by Industry Leaders
      </h2>
      <div className="marquee-container overflow-hidden relative">
        <div className="marquee-content flex items-center space-x-8">
          {customers.map((customer, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center min-w-[150px] bg-white shadow-md p-4 rounded-lg hover:scale-105 transition-transform"
            >
              <img
                src={customer.logo}
                alt={customer.name}
                className="w-20 h-auto"
              />
              <p className="mt-4 text-gray-600">{customer.name}</p>
            </div>
          ))}
          {/* Duplicate the content for seamless scrolling */}
          {customers.map((customer, index) => (
            <div
              key={`copy-${index}`}
              className="flex flex-col items-center justify-center min-w-[150px] bg-white shadow-md p-4 rounded-lg hover:scale-105 transition-transform"
            >
              <img
                src={customer.logo}
                alt={customer.name}
                className="w-20 h-auto"
              />
              <p className="mt-4 text-gray-600">{customer.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeCarousel;
