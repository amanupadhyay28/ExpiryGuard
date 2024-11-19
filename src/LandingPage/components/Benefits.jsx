import React from "react";

const Benefits = () => {
  const benefits = [
    {
      title: "For Retailers",
      points: [
        "Reduce waste by up to 50%.",
        "Free up valuable shelf space.",
        "Increase overall profitability.",
      ],
    },
    {
      title: "For Suppliers",
      points: [
        "Save on return logistics costs.",
        "Quickly fulfill retailer demand.",
        "Improve customer satisfaction.",
      ],
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Benefits
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="p-6 bg-blue-50 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {benefit.title}
              </h3>
              <ul className="mt-4 text-gray-600 list-disc list-inside">
                {benefit.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
