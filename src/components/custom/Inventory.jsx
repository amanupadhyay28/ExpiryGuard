import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import RetailerDetailsOverlay from "./RetailerDetailsOverlay";
import RetailerTable from "./RetailerTable";
import { useGetRetailerForSupplierMutation } from "../../services/common/";

function Inventory() {
  const [selectedRetailer, setSelectedRetailer] = useState(null);
  const [getRetailerForSupplierMutation, { isLoading }] =
    useGetRetailerForSupplierMutation();

  useEffect(() => {
    const supplierEmail = localStorage.getItem("email");
    console.log("supplierEmail from localStorage:", supplierEmail);

    if (supplierEmail) {
      getRetailerForSupplierMutation({ supplierEmail })
        .unwrap()
        .then((response) => console.log("response", response))
        .catch((error) => console.error("Error fetching retailers:", error));
    } else {
      console.error("No supplier email found in localStorage.");
    }
  }, [getRetailerForSupplierMutation]);

  const transitionSettings = {
    duration: 0.6,
    ease: [0.42, 0, 0.58, 1], // Smooth ease-in-out curve
  };

  return (
    <div className="relative flex w-full h-full">
      {/* Table section */}
      <motion.div
        className="relative"
        style={{ width: selectedRetailer ? "50%" : "100%" }} // Set table width to 50% when overlay is open
        animate={{ width: selectedRetailer ? "50%" : "100%" }}
        transition={transitionSettings}
      >
        <RetailerTable onSelectRetailer={setSelectedRetailer} />
      </motion.div>

      {/* Overlay section */}
      {selectedRetailer && (
        <motion.div
          className="relative bg-white shadow-lg h-full"
          style={{ width: "50%" }} // Set overlay width to 50%
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={transitionSettings}
        >
          <RetailerDetailsOverlay
            retailer={selectedRetailer}
            onClose={() => setSelectedRetailer(null)}
          />
        </motion.div>
      )}
    </div>
  );
}

export default Inventory;
