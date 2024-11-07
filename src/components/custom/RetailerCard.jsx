import React from "react";

const RetailerInfoCard = ({ data }) => {
  return (
    <div className="bg-white p-6">
      <h2 className="text-xl font-semibold mb-4">Retailer Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((retailer) => (
          <div
            key={retailer._id}
            className="bg-white p-4 rounded-lg shadow-md  hover:bg-slate-100"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0 mr-4">
                <img
                  src={`https://ui-avatars.com/api/?name=${retailer.name}`}
                  alt={`${retailer.name}'s avatar`}
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium">{retailer.name}</h3>
                <p className="text-sm text-gray-600">{retailer.email}</p>
              </div>
            </div>
            <div className="text-sm">
              <p className="mb-2">
                <span className="font-semibold">Address:</span>{" "}
                {retailer.address}
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                {retailer.phoneNumber}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RetailerInfoCard;
