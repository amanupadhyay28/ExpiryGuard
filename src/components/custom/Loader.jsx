import React from "react";
import { TailSpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <TailSpin height="80" width="80" color="#f3a247" ariaLabel="loading" />
    </div>
  );
};

export default Loader;
