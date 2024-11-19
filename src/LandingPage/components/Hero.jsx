import React from "react";

const Hero = () => {
  return (
    <section className="bg-blue-50 py-16">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold text-blue-600">
          Optimize Inventory, Maximize Profit
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Connect retailers and suppliers to redistribute near-expiry products
          efficiently.
        </p>
        <button className="mt-8 bg-blue-600 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-700">
          Get Started for Free
        </button>
      </div>
    </section>
  );
};

export default Hero;
