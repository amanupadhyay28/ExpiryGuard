import React, { useState, useRef, useEffect } from "react";
import { FaRupeeSign } from "react-icons/fa";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RetailerProductData = ({ data }) => {
  const sendRequests = data.filter((item) => item.reqType === "send");
  const otherRequests = data.filter((item) => item.reqType !== "send");

  console.log("Send Requests:", sendRequests);
  console.log("Other Requests:", otherRequests);
  return (
    <>
      <ToastContainer />

      <div className="p-4 bg-white shadow-md rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-600 uppercase text-xs font-semibold border-b">
              <th className="px-4 py-3">Request ID</th>
              <th className="px-4 py-3">Product Name</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3">Supplier Email</th>
              <th className="px-4 py-3">Retailer Email</th>
              <th className="px-4 py-3">Expiry Date</th>
              <th className="px-4 py-3">Request Type</th>
            </tr>
            <thead>
              <tr className="text-gray-600 uppercase text-xs font-semibold border-b ">
                <th
                  colSpan="8"
                  className="px-4 py-3 text-gray-800 uppercase text-xs "
                >
                  Products Send
                </th>
              </tr>
            </thead>
          </thead>
          <tbody className="text-gray-800 text-sm bg-slate-100">
            {sendRequests.length > 0 ? (
              sendRequests.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-4">{product.requestId}</td>
                  <td className="px-4 py-4">{product.productName}</td>
                  <td className="px-4 py-4 text-gray-800 font-semibold flex items-center">
                    <FaRupeeSign />
                    {product.price}
                  </td>
                  <td className="px-4 py-4">{product.quantity}</td>
                  <td className="px-4 py-4">{product.supplierEmail}</td>
                  <td className="px-4 py-4">{product.retailerEmail}</td>
                  <td className="px-4 py-4 text-red-600 font-semibold">
                    {product.expiryDate}
                  </td>
                  <td className="px-4 py-4">{product.reqType}</td>
                  <td className="px-4 py-4 flex items-center relative"></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="px-4 py-4 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
          <thead>
            <thead>
              <tr className="text-gray-800 uppercase text-xs font-semibold border-b text-center">
                <th className="px-4 py-3"> Products Requested</th>
              </tr>
            </thead>
          </thead>
          <tbody className="text-gray-800 text-sm bg-violet-100">
            {otherRequests.length > 0 ? (
              otherRequests.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-4">{product.requestId}</td>
                  <td className="px-4 py-4">{product.productName}</td>
                  <td className="px-4 py-4 text-gray-800 font-semibold flex items-center">
                    <FaRupeeSign />
                    {product.price}
                  </td>
                  <td className="px-4 py-4">{product.quantity}</td>
                  <td className="px-4 py-4">{product.supplierEmail}</td>
                  <td className="px-4 py-4">{product.retailerEmail}</td>
                  <td className="px-4 py-4 text-red-600 font-semibold">
                    {product.expiryDate}
                  </td>
                  <td className="px-4 py-4 text-blue-800">{product.reqType}</td>
                  <td className="px-4 py-4 flex items-center relative"></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="px-4 py-4 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default RetailerProductData;
