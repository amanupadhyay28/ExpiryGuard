import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaRupeeSign, FaBoxes, FaCalendarAlt } from "react-icons/fa";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "../../components/ui/dialog";
import { useGetExpiringProductsForSupplierMutation } from "../../services/common/index.js";
import Loader from "../custom/Loader";

const ProductInfo = () => {
  const location = useLocation();
  const products = location.state?.inventoryData || [];
  const isModalOpen = location.state?.isOpenAlertModal || false;
  const retailerEmail = location.state?.retailerEmail || "";
  const supplierEmail = location.state?.supplierEmail || "";

  const [modalOpen, setModalOpen] = useState(isModalOpen);
  const [sortedProducts, setSortedProducts] = useState(products);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [getExpiringProducts, { isLoading: isExpiringLoading }] =
    useGetExpiringProductsForSupplierMutation();

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
  const [expiringProducts, setExpiringProducts] = useState(null);

  useEffect(() => {
    try {
      getExpiringProducts({ retailerEmail, supplierEmail })
        .unwrap()
        .then((response) => {
          console.log("response is ", response);

          setExpiringProducts(response.expiringProductsCount);
        })
        .catch((error) =>
          console.error("Error fetching expiring products:", error)
        );
    } catch (error) {
      console.error(`No expiring products found ${error}`);
    }
  }, [getExpiringProducts]);

  console.log(expiringProducts);
  if (isExpiringLoading) {
    return <Loader />;
  }

  return (
    <>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="bg-primary w-[900px] h-[300px]">
          <div className="bg-white m-[-18px] rounded-md flex justify-center items-center ">
            <h1 className="text-6xl   text-red-600 font-bold text-center py-2 ">
              !! ALERT !!
            </h1>
          </div>
          <h1 className="text-3xl  mb-4 text-white font-extrabold text-center mt-6 ">
            Expiring Products
          </h1>
          <div className="text-center text-white text-2xl">
            {expiringProducts > 0 ? (
              <p>
                You have{" "}
                <span className="text-orange-400 font-semibold hover:underline cursor-pointer">
                  {expiringProducts === 1
                    ? `${expiringProducts} product `
                    : `${expiringProducts} products `}
                </span>
                expiring within a week.
              </p>
            ) : (
              <p>No products are expiring within a week.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>

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
    </>
  );
};

export default ProductInfo;
