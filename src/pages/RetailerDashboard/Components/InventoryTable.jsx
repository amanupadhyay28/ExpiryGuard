import React, { useState, useRef, useEffect } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { LuMoreHorizontal } from "react-icons/lu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "../../../components/ui/breadcrumb";
import FormDialog from "../Components/FormDialog";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import the toastify CSS
import { usePostProductReqRetailerMutation } from "../../../services/common/index";
const InventoryTable = ({ items }) => {
  const [isBreadcrumbOpen, setIsBreadcrumbOpen] = useState(null);
  const [dialogData, setDialogData] = useState(null);

  const [reqType, setreqType] = useState("");
  const breadcrumbRef = useRef(null);
  const navigate = useNavigate();
  const [postProductReq, { isLoading }] = usePostProductReqRetailerMutation();

  const toggleBreadcrumb = (productId) => {
    setIsBreadcrumbOpen((prev) => (prev === productId ? null : productId));
  };

  const handleDialogOpen = (product, reqType) => {
    console.log("in modal req type is ", reqType);
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
      const response = await postProductReq(data).unwrap();

      toast.success("Product request sent successfully!", {
        position: "top-right",
        autoClose: 800,
        onClose: () => {
          handleDialogClose();
        },
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
                        className="absolute top-6 left-[-120px] bg-slate-100 shadow-lg rounded p-5 z-10 w-[150px]"
                      >
                        <Breadcrumb>
                          <BreadcrumbItem className="mb-1">
                            <BreadcrumbLink
                              onClick={() =>
                                handleDialogOpen(product, "request")
                              }
                              className="text-[14px] font-semibold hover:text-blue-500  cursor-pointer hover:underline"
                            >
                              {" "}
                              Request Product
                            </BreadcrumbLink>
                          </BreadcrumbItem>

                          <BreadcrumbItem>
                            <BreadcrumbLink
                              className="text-[14px] font-semibold hover:text-blue-500  cursor-pointer hover:underline"
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
