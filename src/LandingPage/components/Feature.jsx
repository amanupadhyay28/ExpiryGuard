import React from "react";

const Features = () => {
  const features = [
    {
      title: "Smart Inventory Tracking",
      description: "Track and manage near-expiry products in real-time.",
      icon: "📊",
    },
    {
      title: "Seamless Redistribution",
      description:
        "Connect with suppliers or retailers for efficient redistribution.",
      icon: "🔄",
    },
    {
      title: "Cost Savings",
      description: "Reduce wastage and save costs on returns.",
      icon: "💰",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Features
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-blue-50 rounded-lg shadow text-center"
            >
              <div className="text-4xl">{feature.icon}</div>
              <h3 className="mt-4 text-xl font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
