// src/components/Redistribution.js
import React, { useEffect } from "react";
import { useGetDriverDetailsMutation } from "@/services/common";
import { Button } from "../ui/button";

const Redistribution = () => {
  const [getDriverDetails, { isLoading }] = useGetDriverDetailsMutation();
  const supplierEmail = localStorage.getItem("email");

  useEffect(() => {
    const getDriver = async () => {
      const response = await getDriverDetails({ supplierEmail }).unwrap();
    };
    getDriver();
  }, [getDriverDetails]);
  const handleClick = () => {};
  return (
    <div className="flex items-center justify-center h-full">
      <h2 className="text-2xl font-semibold">
        <Button onClick={handleClick}>Add Driver</Button>
      </h2>
    </div>
  );
};

export default Redistribution;
