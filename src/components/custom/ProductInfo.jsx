import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaRupeeSign, FaBoxes, FaCalendarAlt } from "react-icons/fa";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const ProductInfo = () => {
  const location = useLocation();
  const products = location.state?.inventoryData || [];

  const [sortedProducts, setSortedProducts] = useState(products);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  const handleSort = (columnKey) => {
    let direction = "ascending";
    if (sortConfig.key === columnKey && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    const sortedData = [...sortedProducts].sort((a, b) => {
      if (a[columnKey] < b[columnKey])
        return direction === "ascending" ? -1 : 1;
      if (a[columnKey] > b[columnKey])
        return direction === "ascending" ? 1 : -1;
      return 0;
    });

    setSortedProducts(sortedData);
    setSortConfig({ key: columnKey, direction });
  };

  const getArrowClasses = (columnKey, arrowDirection) => {
    const isActive =
      sortConfig.key === columnKey && sortConfig.direction === arrowDirection;
    return isActive ? "text-gray-800" : "text-gray-400";
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Product Inventory
      </h2>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-gray-600 uppercase text-xs font-semibold border-b">
            <th
              className="px-4 py-3 cursor-pointer"
              onClick={() => handleSort("productName")}
            >
              Product Name
              <FaArrowUp
                className={`inline-block ml-1 ${getArrowClasses(
                  "productName",
                  "ascending"
                )}`}
              />
              <FaArrowDown
                className={`inline-block ml-1 ${getArrowClasses(
                  "productName",
                  "descending"
                )}`}
              />
            </th>
            <th
              className="px-4 py-3 cursor-pointer"
              onClick={() => handleSort("description")}
            >
              Description
              <FaArrowUp
                className={`inline-block ml-1 ${getArrowClasses(
                  "description",
                  "ascending"
                )}`}
              />
              <FaArrowDown
                className={`inline-block ml-1 ${getArrowClasses(
                  "description",
                  "descending"
                )}`}
              />
            </th>
            <th
              className="px-4 py-3 cursor-pointer"
              onClick={() => handleSort("quantity")}
            >
              Quantity
              <FaArrowUp
                className={`inline-block ml-1 ${getArrowClasses(
                  "quantity",
                  "ascending"
                )}`}
              />
              <FaArrowDown
                className={`inline-block ml-1 ${getArrowClasses(
                  "quantity",
                  "descending"
                )}`}
              />
            </th>
            <th
              className="px-4 py-3 cursor-pointer"
              onClick={() => handleSort("price")}
            >
              Price
              <FaArrowUp
                className={`inline-block ml-1 ${getArrowClasses(
                  "price",
                  "ascending"
                )}`}
              />
              <FaArrowDown
                className={`inline-block ml-1 ${getArrowClasses(
                  "price",
                  "descending"
                )}`}
              />
            </th>
            <th
              className="px-4 py-3 cursor-pointer"
              onClick={() => handleSort("batchNumber")}
            >
              Batch
              <FaArrowUp
                className={`inline-block ml-1 ${getArrowClasses(
                  "batchNumber",
                  "ascending"
                )}`}
              />
              <FaArrowDown
                className={`inline-block ml-1 ${getArrowClasses(
                  "batchNumber",
                  "descending"
                )}`}
              />
            </th>
            <th
              className="px-4 py-3 cursor-pointer"
              onClick={() => handleSort("manufactureDate")}
            >
              Manufacture Date
              <FaArrowUp
                className={`inline-block ml-1 ${getArrowClasses(
                  "manufactureDate",
                  "ascending"
                )}`}
              />
              <FaArrowDown
                className={`inline-block ml-1 ${getArrowClasses(
                  "manufactureDate",
                  "descending"
                )}`}
              />
            </th>
            <th
              className="px-4 py-3 cursor-pointer"
              onClick={() => handleSort("expiryDate")}
            >
              Expiry Date
              <FaArrowUp
                className={`inline-block ml-1 ${getArrowClasses(
                  "expiryDate",
                  "ascending"
                )}`}
              />
              <FaArrowDown
                className={`inline-block ml-1 ${getArrowClasses(
                  "expiryDate",
                  "descending"
                )}`}
              />
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-800 text-sm bg-slate-100">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
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
