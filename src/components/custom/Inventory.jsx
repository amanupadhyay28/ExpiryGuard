import React, { useState } from "react";
import { motion } from "framer-motion";
import RetailerDetailsOverlay from "./RetailerDetailsOverlay";
import RetailerTable from "./RetailerTable";

function Inventory() {
  const [selectedRetailer, setSelectedRetailer] = useState(null);

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
