import React from "react";
import { useLocation } from "react-router-dom";
import {
  FaDollarSign,
  FaBoxes,
  FaCalendarAlt,
  FaShippingFast,
  FaRupeeSign,
} from "react-icons/fa";
const ProductInfo = () => {
  const location = useLocation();
  const products = location.state?.inventoryData;
  console.log(products);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Product Inventory
      </h2>

      <table className="w-full table-auto bg-white shadow-lg rounded-lg border-collapse text-center">
        <thead>
          <tr className="bg-orange-600 text-white ">
            <th className="py-3 px-6 ">Product Name</th>
            <th className="py-3 px-6 ">Description</th>
            <th className="py-3 px-6">Quantity</th>
            <th className="py-3 px-6 ">Price</th>
            <th className="py-3 px-6 ">Batch</th>
            <th className="py-3 px-6">Manufacture </th>
            <th className="py-3 px-6 ">Expiry</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product, index) => (
            <tr
              key={product._id}
              className={`${
                index % 2 === 0 ? "bg-orange-100" : "bg-slate-50"
              } border-t border-gray-200 hover:bg-orange-200 transition-colors duration-200`}
            >
              <td className="py-4 px-6 text-gray-800 font-semibold">
                {product.productName}
              </td>
              <td className="py-4 px-6 text-gray-600">{product.description}</td>
              <td className="py-4 px-6 text-gray-600 font-semibold">
                {product.quantity}
              </td>
              <td className="py-4 px-6 text-gray-600">
                <FaRupeeSign className="inline  text-gray-400" />
                <span className="font-semibold text-green-600">
                  {product.price}
                </span>
              </td>

              <td className="py-4 px-6 text-gray-600">
                <FaBoxes className="inline mr-2 text-gray-400" />
                <span className="font-semibold text-gray-600">
                  {product.batchNumber}
                </span>
              </td>
              <td className="py-4 px-6 text-gray-600">
                <FaCalendarAlt className="inline mr-2 text-gray-400" />
                <span className="font-semibold text-green-600">
                  {product.manufactureDate}
                </span>
              </td>
              <td className="py-4 px-6 text-gray-600">
                <FaCalendarAlt className="inline mr-2 text-gray-400" />
                <span className="font-semibold text-red-600">
                  {product.expiryDate}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductInfo;
