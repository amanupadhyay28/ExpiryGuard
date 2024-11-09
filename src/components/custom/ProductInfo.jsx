import React from "react";
import { useLocation } from "react-router-dom";
import { FaRupeeSign, FaBoxes, FaCalendarAlt } from "react-icons/fa";

const ProductInfo = () => {
  const location = useLocation();
  const products = location.state?.inventoryData || [];

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Product Inventory
      </h2>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-gray-600 uppercase text-xs font-semibold border-b">
            <th className="px-4 py-3">Product Name</th>
            <th className="px-4 py-3">Description</th>
            <th className="px-4 py-3">Quantity</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Batch</th>
            <th className="px-4 py-3">Manufacture Date</th>
            <th className="px-4 py-3">Expiry Date</th>
          </tr>
        </thead>
        <tbody className="text-gray-800 text-sm bg-slate-100">
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-4 font-semibold">
                  {product.productName || "N/A"}
                </td>
                <td className="px-4 py-4">{product.description || "N/A"}</td>
                <td className="px-4 py-4 font-semibold">
                  {product.quantity || "N/A"}
                </td>
                <td className="px-4 py-4 text-gray-800 font-semibold">
                  <FaRupeeSign className="mr-1 text-gray-400" />
                  {product.price || "N/A"}
                </td>
                <td className="px-4 py-4">
                  <FaBoxes className="mr-2 text-gray-400" />
                  {product.batchNumber || "N/A"}
                </td>
                <td className="px-4 py-4">
                  <FaCalendarAlt className="mr-2 text-gray-400" />
                  <span className="text-green-600 font-semibold">
                    {product.manufactureDate || "N/A"}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <FaCalendarAlt className="mr-2 text-gray-400" />
                  <span className="text-red-600 font-semibold">
                    {product.expiryDate || "N/A"}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="px-4 py-4 text-center text-gray-500">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductInfo;
