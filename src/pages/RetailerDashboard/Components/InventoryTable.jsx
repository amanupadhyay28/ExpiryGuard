import React, { useState, useRef, useEffect } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { LuMoreHorizontal } from "react-icons/lu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "../../../components/ui/breadcrumb";

const InventoryTable = ({ items }) => {
  const [isBreadcrumbOpen, setIsBreadcrumbOpen] = useState(null);
  const breadcrumbRef = useRef(null);

  const toggleBreadcrumb = (productId) => {
    setIsBreadcrumbOpen((prev) => (prev === productId ? null : productId));
  };

  // Close breadcrumb when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        breadcrumbRef.current &&
        !breadcrumbRef.current.contains(event.target)
      ) {
        setIsBreadcrumbOpen(null);
      }
    };

    // Attach event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-gray-600 uppercase text-xs font-semibold border-b">
            <th className="px-4 py-3">Product ID</th>
            <th className="px-4 py-3">Product Name</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Quantity</th>
            <th className="px-4 py-3">Supplier Name</th>
            <th className="px-4 py-3">Supplier Email</th>
            <th className="px-4 py-3">Manufacture Date</th>
            <th className="px-4 py-3">Expiry Date</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-800 text-sm">
          {items.length > 0 ? (
            items.map((product) => (
              <tr key={product.productId} className="border-b hover:bg-gray-50">
                <td className="px-4 py-4">{product.productId}</td>
                <td className="px-4 py-4">{product.productName}</td>
                <td className="px-4 py-4 text-orange-400 font-semibold flex items-center">
                  <FaRupeeSign />
                  {product.price}
                </td>
                <td className="px-4 py-4">{product.quantity}</td>
                <td className="px-4 py-4">{product.supplierName}</td>
                <td className="px-4 py-4">{product.supplierEmail}</td>
                <td className="px-4 py-4 font-semibold">
                  {product.manufactureDate}
                </td>
                <td className="px-4 py-4 text-red-600 font-semibold">
                  {product.expiryDate}
                </td>
                <td className="px-4 py-4 flex items-center relative">
                  <LuMoreHorizontal
                    onClick={() => toggleBreadcrumb(product.productId)}
                  />
                  {isBreadcrumbOpen === product.productId && (
                    <div
                      ref={breadcrumbRef}
                      className="absolute top-8 left-0 bg-slate-200 shadow-lg rounded p-5 z-10"
                    >
                      <Breadcrumb>
                        <BreadcrumbItem>
                          <BreadcrumbLink>Request</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                          <BreadcrumbLink>Send</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                          <BreadcrumbLink>Remove</BreadcrumbLink>
                        </BreadcrumbItem>
                      </Breadcrumb>
                    </div>
                  )}
                </td>
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
  );
};

export default InventoryTable;
