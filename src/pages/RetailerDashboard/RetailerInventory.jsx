import React, { useEffect, useState } from "react";
import { useGetRetailerInventoryMutation } from "../../services/common/index.js";
import InventoryTable from "./Components/InventoryTable.jsx";
import { ArchiveIcon } from "lucide-react";

const RetailerInventory = () => {
  const [getRetailerInventory, { isLoading }] =
    useGetRetailerInventoryMutation();
  const retailerEmail = localStorage.getItem("email");
  const [inventoryData, setInventoryData] = useState([]);
  useEffect(() => {
    const getInventory = async () => {
      const response = await getRetailerInventory({ retailerEmail }).unwrap();
      console.log("response ", response.products);
      setInventoryData(response.products);
    };
    getInventory();
  }, [getRetailerInventory, retailerEmail]);
  return (
    <div className="relative  w-full h-full">
      <div className="flex mt-5 ml-5 mb-5  items-center gap-2">
        <ArchiveIcon size={20} />
        <h2 className="text-2xl font-bold text-gray-800  ">
          Inventory Data
        </h2>
      </div>
      <InventoryTable items={inventoryData} />
    </div>
  );
};

export default RetailerInventory;
