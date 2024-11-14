import { useState, useRef, useEffect } from "react";
import { FaRupeeSign, FaSortUp, FaSortDown } from "react-icons/fa";
import { LuMoreHorizontal } from "react-icons/lu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "../../../components/ui/breadcrumb";
import FormDialog from "../Components/FormDialog";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePostProductReqRetailerMutation } from "../../../services/common/index";

const InventoryTable = ({ items }) => {
  const [isBreadcrumbOpen, setIsBreadcrumbOpen] = useState(null);
  const [dialogData, setDialogData] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [reqType, setreqType] = useState("");
  const breadcrumbRef = useRef(null);
  const [postProductReq] = usePostProductReqRetailerMutation();

  const toggleBreadcrumb = (productId) => {
    setIsBreadcrumbOpen((prev) => (prev === productId ? null : productId));
  };

  const sortedData = [...items].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const toggleSort = (column) => {
    const columnKeyMap = {
      "Product ID": "productId",
      "Product Name": "productName",
      Price: "price",
      Quantity: "quantity",
      "Supplier Name": "supplierName",
      "Supplier Email": "supplierEmail",
      "Manufacture Date": "manufactureDate",
      "Expiry Date": "expiryDate",
    };
    const key = columnKeyMap[column] || column;

    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const getSortIcon = (column) => {
    const columnKeyMap = {
      "Product ID": "productId",
      "Product Name": "productName",
      Price: "price",
      Quantity: "quantity",
      "Supplier Name": "supplierName",
      "Supplier Email": "supplierEmail",
      "Manufacture Date": "manufactureDate",
      "Expiry Date": "expiryDate",
    };
    const key = columnKeyMap[column] || column;

    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? (
        <FaSortUp title="Sort Descending" />
      ) : (
        <FaSortDown title="Sort Ascending" />
      );
    }
    return null;
  };

  const handleDialogOpen = (product, reqType) => {
    setreqType(reqType);
    setDialogData(product);
  };

  const handleDialogClose = () => {
    setDialogData(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        breadcrumbRef.current &&
        !breadcrumbRef.current.contains(event.target)
      ) {
        setIsBreadcrumbOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFormSubmit = async (data) => {
    try {
      await postProductReq(data).unwrap();
      toast.success("Product request sent successfully!", {
        position: "top-right",
        autoClose: 800,
        onClose: handleDialogClose,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="p-4 bg-white shadow-md rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead className="text-gray-600 uppercase text-xs font-semibold border-b">
            <tr>
              {[
                "Product ID",
                "Product Name",
                "Price",
                "Quantity",
                "Supplier Name",
                "Supplier Email",
                "Manufacture Date",
                "Expiry Date",
                "Action",
              ].map((column) => (
                <th
                  key={column}
                  className="px-4 py-3 cursor-pointer"
                  onClick={() => toggleSort(column)}
                >
                  <div className="flex items-center">
                    <span>{column.replace(/([A-Z])/g, " $1")}</span>
                    <span>{getSortIcon(column)}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm">
            {sortedData.length > 0 ? (
              sortedData.map((product) => (
                <tr
                  key={product.productId}
                  className="border-b hover:bg-gray-50"
                >
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
                  <td className="px-4 py-4 text-white bg-red-500 hover:bg-red-700 font-semibold">
                    {product.expiryDate}
                  </td>
                  <td className="px-4 py-4 flex items-center relative">
                    <LuMoreHorizontal
                      onClick={() => toggleBreadcrumb(product.productId)}
                    />
                    {isBreadcrumbOpen === product.productId && (
                      <div
                        ref={breadcrumbRef}
                        className="absolute top-6 left-[-120px] bg-slate-100 shadow-lg rounded p-5 z-10 w-[150px]"
                      >
                        <Breadcrumb>
                          <BreadcrumbItem className="mb-1">
                            <BreadcrumbLink
                              onClick={() =>
                                handleDialogOpen(product, "request")
                              }
                              className="text-[14px] font-semibold hover:text-blue-500 cursor-pointer hover:underline"
                            >
                              Request Product
                            </BreadcrumbLink>
                          </BreadcrumbItem>
                          <BreadcrumbItem>
                            <BreadcrumbLink
                              className="text-[14px] font-semibold hover:text-blue-500 cursor-pointer hover:underline"
                              onClick={() => handleDialogOpen(product, "send")}
                            >
                              Send Extras
                            </BreadcrumbLink>
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
        {dialogData && (
          <FormDialog
            open={!!dialogData}
            onClose={handleDialogClose}
            product={dialogData}
            onSubmit={handleFormSubmit}
            reqType={reqType}
          />
        )}
      </div>
    </>
  );
};

export default InventoryTable;
