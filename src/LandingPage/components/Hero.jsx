import React from "react";
import { InventoryTrackingTwo } from "../../assets/index";

const Hero = () => {
  return (
    <section className="bg-blue-50 py-16">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
        {/* Text Section - Left side */}
        <div className="md:w-1/2 text-center md:text-left">
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

        {/* Image Section - Right side */}
        <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center">
          <img
            src={InventoryTrackingTwo}
            alt="Hero Image"
            className="h-96 w-96 object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
