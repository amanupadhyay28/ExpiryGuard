import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardOverviewCard = ({ data }) => {
  const { lowStockProducts, nearestExpiryProducts, latestProductRequests } = {
    ...data,
  };

  const navigate = useNavigate();

  return (
    // <div className="p-4 bg-gray-100 ">
    <div
      className="my-10 max-w-full shadow-lg rounded-lg overflow-hidden bg-gradient-to-r from-[#5d60ef] to-[#a39af6]

"
    >
      <div className="p-6 w-full">
        <h2 className="text-2xl  text-white font-bold  mb-4">
          Dashboard Overview
        </h2>

        <div className="flex flex-row gap-x-6">
          {/* Low Stock Products */}
          <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow-md">
            <div className=" relative">
              <h3 className="text-lg font-semibold text-gray-600 mb-2 border-b-2">
                Low Stock Products
              </h3>
              <button
                className="absolute top-[-10px] right-0 mt-2 text-sm text-blue-600 hover:underline"
                onClick={() => navigate("/inventory")}
              >
                Show All
              </button>
            </div>
            <ul>
              {lowStockProducts.map((product, index) => (
                <li
                  key={index}
                  className="flex justify-between text-sm text-gray-600 mb-1"
                >
                  <span>{product.productName}</span>
                  <span className="text-red-600 font-medium">
                    {product.quantity}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Near Expiry Products */}
          <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow-md">
            <div className=" relative">
              <h3 className="text-lg font-semibold text-gray-600 mb-2 border-b-2">
                Near Expiry Products
              </h3>
              <button
                className=" absolute top-[-10px] right-0 mt-2 text-sm text-blue-600 hover:underline"
                onClick={() => navigate("/inventory")}
              >
                Show All
              </button>
            </div>
            <ul>
              {nearestExpiryProducts.map((product, index) => (
                <li
                  key={index}
                  className="flex justify-between text-sm text-gray-600 mb-1"
                >
                  <span>{product.productName}</span>
                  <span className="text-orange-600">{product.expiryDate}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Latest Product Requests */}
          <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow-md">
            <div className=" relative">
              <h3 className="text-lg font-semibold text-gray-600 mb-2 border-b-2">
                Latest Product Requests
              </h3>
              <button
                className=" absolute top-[-10px] right-0 mt-2 text-sm text-blue-600 hover:underline"
                onClick={() => navigate("/my_request")}
              >
                Show All
              </button>
            </div>
            <ul>
              {latestProductRequests.map((request, index) => (
                <li
                  key={index}
                  className="flex justify-between text-sm text-gray-600 mb-1"
                >
                  <span>{request.productName}</span>
                  <span
                    className={`font-medium ${
                      request.reqStatus === "pending"
                        ? "text-yellow-500"
                        : request.reqStatus === "approved"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {request.reqStatus}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>

    // </div>
  );
};

export default DashboardOverviewCard;
