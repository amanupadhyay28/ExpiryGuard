// import React, { useState } from "react";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { FaPhone, FaEnvelope, FaTruck, FaMapMarkerAlt } from "react-icons/fa";

// const drivers = [
//   {
//     driverId: "DRV-1731144371543-301",
//     driverName: "Rajesh Kumar",
//     phoneNumber: "+91-9876543210",
//     vehicleNumber: "UP32 AB 1234",
//     driverEmail: "rajesh.kumar@gmail.com",
//     serviceArea: "Lucknow",
//     vehicleType: "Truck",
//     _id: "672f2ab325710bcd61c2eabb",
//   },
//   {
//     driverId: "DRV-1731144485557-983",
//     driverName: "Sita Verma",
//     phoneNumber: "+919876543211",
//     vehicleNumber: "UP78 CD 5678",
//     driverEmail: "sita.verma@gmail.com",
//     serviceArea: "Kanpur",
//     vehicleType: "Van",
//     _id: "672f2b2525710bcd61c2eabf",
//   },
//   {
//     driverId: "DRV-1731144507449-736",
//     driverName: "Amit Singh",
//     phoneNumber: "+919876543212",
//     vehicleNumber: "UP14 EF 9012",
//     driverEmail: "amit.singh@gmail.com",
//     serviceArea: "Ghaziabad",
//     vehicleType: "Mini Truck",
//     _id: "672f2b3b25710bcd61c2eac4",
//   },
//   {
//     driverId: "DRV-1731144526879-160",
//     driverName: "Priya Sharma",
//     phoneNumber: "+919876543213",
//     vehicleNumber: "UP32 GH 3456",
//     driverEmail: "priya.sharma@gmail.com",
//     serviceArea: "Lucknow",
//     vehicleType: "Van",
//     _id: "672f2b4e25710bcd61c2eaca",
//   },
//   {
//     driverId: "DRV-1731144543937-941",
//     driverName: "Vikram Chauhan",
//     phoneNumber: "+919876543214",
//     vehicleNumber: "UP78 IJ 7890",
//     driverEmail: "vikram.chauhan@gmail.com",
//     serviceArea: "Kanpur",
//     vehicleType: "Pickup",
//     _id: "672f2b5f25710bcd61c2ead1",
//   },
//   {
//     driverId: "DRV-1731144573876-107",
//     driverName: "Anjali Gupta",
//     phoneNumber: "+919876543215",
//     vehicleNumber: "UP14 KL 1122",
//     driverEmail: "anjali.gupta@gmail.com",
//     serviceArea: "Ghaziabad",
//     vehicleType: "Mini van",
//     _id: "672f2b7d25710bcd61c2ead9",
//   },
// ];

// const DriverCarousel = () => {
//   const [selectedDriver, setSelectedDriver] = useState(drivers[0]);

//   const handleCardClick = (driver) => {
//     setSelectedDriver(driver);
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen flex flex-col justify-end">
//       {/* Driver Details Section */}
//       <div className="flex-grow p-6 bg-white rounded-t-lg shadow-lg">
//         <h1 className="text-3xl font-bold text-gray-800 mb-4">
//           Driver Details
//         </h1>
//         <div className="space-y-3">
//           <p className="flex items-center gap-2">
//             <span className="font-semibold">Name:</span>{" "}
//             {selectedDriver.driverName}
//           </p>
//           <p className="flex items-center gap-2">
//             <FaPhone className="text-blue-600" />
//             <span>{selectedDriver.phoneNumber}</span>
//           </p>
//           <p className="flex items-center gap-2">
//             <FaEnvelope className="text-red-500" />
//             <a
//               href={`mailto:${selectedDriver.driverEmail}`}
//               className="text-blue-500"
//             >
//               {selectedDriver.driverEmail}
//             </a>
//           </p>
//           <p className="flex items-center gap-2">
//             <FaTruck className="text-yellow-600" />
//             <span>
//               {selectedDriver.vehicleNumber} - {selectedDriver.vehicleType}
//             </span>
//           </p>
//           <p className="flex items-center gap-2">
//             <FaMapMarkerAlt className="text-green-500" />
//             <span>{selectedDriver.serviceArea}</span>
//           </p>
//         </div>
//       </div>

//       {/* Carousel Section */}
//       <div className="w-full bg-gray-200 p-4 shadow-lg">
//         <Carousel>
//           <CarouselPrevious className="absolute left-0 z-10 h-full w-8 bg-white rounded-full shadow-lg cursor-pointer flex items-center justify-center">
//             <span className="text-gray-600 font-bold">&lt;</span>
//           </CarouselPrevious>

//           <CarouselContent className="flex items-center overflow-x-scroll w-full px-10 space-x-4">
//             {drivers.map((driver) => (
//               <CarouselItem
//                 key={driver.driverId}
//                 className="w-1/5 min-w-[200px] flex-shrink-0"
//                 onClick={() => handleCardClick(driver)}
//               >
//                 <div className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-blue-50 transition">
//                   <h3 className="text-lg font-semibold text-gray-700 mb-2">
//                     {driver.driverName}
//                   </h3>
//                   <p className="text-sm text-gray-600 flex items-center gap-2">
//                     <FaTruck className="text-yellow-500" />
//                     {driver.vehicleType}
//                   </p>
//                   <p className="text-sm text-gray-600 flex items-center gap-2">
//                     <FaMapMarkerAlt className="text-green-500" />
//                     {driver.serviceArea}
//                   </p>
//                 </div>
//               </CarouselItem>
//             ))}
//           </CarouselContent>

//           <CarouselNext className="absolute right-0 z-10 h-full w-8 bg-white rounded-full shadow-lg cursor-pointer flex items-center justify-center">
//             <span className="text-gray-600 font-bold">&gt;</span>
//           </CarouselNext>
//         </Carousel>
//       </div>
//     </div>
//   );
// };

// export default DriverCarousel;

import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";
import { useState, useEffect } from "react";
import { useGetRetailerForSupplierMutation } from "../../../services/common/index.js";
import Loader from "../../../components/custom/Loader";
import SelectComponent from "../../RetailerDashboard/Components/SupplierSelect";
import { useGetDriverDetailsMutation } from "../../../services/common/index.js";
import { usePostTransferTaskMutation } from "../../../services/common/index.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Orders = () => {
  const [getRetailerForSupplierMutation, { isLoading }] =
    useGetRetailerForSupplierMutation();
  const [getdriverData, { isdriverLoading }] = useGetDriverDetailsMutation();
  const [PostTransferTask, { isPostTransferTaskLoading }] =
    usePostTransferTaskMutation();
  const [retailerData, setRetailerData] = useState([]);
  const [driverData, setDriverData] = useState([]);

  const supplierEmail = localStorage.getItem("email");
  useEffect(() => {
    if (supplierEmail) {
      getRetailerForSupplierMutation({ supplierEmail })
        .unwrap()
        .then((response) => {
          const dataArray = Array.isArray(response) ? response : [response];

          setRetailerData(dataArray);
        })
        .catch((error) => console.error("Error fetching retailers:", error));
    } else {
      console.error("No supplier email found in localStorage.");
    }
  }, [getRetailerForSupplierMutation]);

  useEffect(() => {
    if (supplierEmail) {
      getdriverData({ supplierEmail })
        .unwrap()
        .then((response) => {
          const dataArray = Array.isArray(response) ? response : [response];

          setDriverData(dataArray);
        })
        .catch((error) => console.error("Error fetching retailers:", error));
    } else {
      console.error("No supplier email found in localStorage.");
    }
  }, [getdriverData]);

  const [formData, setFormData] = useState({
    sourceRetailerEmail: "",
    sourceRetailerName: "",
    sourceRetailerAddress: "",
    targetRetailerEmail: "",
    targetRetailerName: "",
    targetRetailerAddress: "",
    products: [{ productName: "", quantity: null, price: null }],
    supplierEmail: supplierEmail,
    driverEmail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSourceEmailChange = (email) => {
    const retailer = retailerData.find((item) => item.email === email);

    setFormData((prevData) => ({
      ...prevData,
      sourceRetailerEmail: email,
      sourceRetailerName: retailer?.name || "",
      sourceRetailerAddress: retailer?.address || "",
    }));
  };

  const handleTargetEmailChange = (email) => {
    const retailer = retailerData.find((item) => item.email === email);
    setFormData((prevData) => ({
      ...prevData,
      targetRetailerEmail: email,
      targetRetailerName: retailer?.name || "",
      targetRetailerAddress: retailer?.address || "",
    }));
  };
  const handleDriverEmailChange = (email) => {
    setFormData((prevData) => ({
      ...prevData,
      driverEmail: email,
    }));
  };
  const handleProductChange = (e, index) => {
    const { name, value } = e.target;
    const products = [...formData.products];
    products[index] = {
      ...products[index],
      [name]: value,
    };
    setFormData((prevData) => ({
      ...prevData,
      products,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await PostTransferTask(formData).unwrap();

      toast.success("Transfer Request Send!!", {
        position: "top-right",
        autoClose: 1000,
      });
    } catch (error) {
      toast.error(`Transfer Product Error! ${error.data.msg}`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <ToastContainer />
      <div className="flex justify-center mt-2 space-x-8 items-center">
        <div className="flex justify-center mt-2">
          <form
            className="space-y-2 p-4 w-[600px] bg-white rounded-2xl"
            onSubmit={handleSubmit}
          >
            <h1 className="text-2xl font-extrabold mb-6 text-center text-gray-400">
              Assign Transfer Task
            </h1>
            {/* <Input
            label="Source Retailer Email"
            name="sourceRetailerEmail"
            placeholder="Enter source retailer email"
            type="email"
            className="w-full"
            value={formData.sourceRetailerEmail}
            onChange={handleChange}
            required
          /> */}
            <SelectComponent
              selectData={retailerData}
              onEmailChange={handleSourceEmailChange}
              onNameChange={() => {}}
              isOrderComponent={true}
            />
            <Input
              label="Source Retailer Name"
              name="sourceRetailerName"
              placeholder="Enter source retailer name"
              className="w-full"
              value={formData.sourceRetailerName}
              readOnly
            />

            <Textarea
              label="Source Retailer Address"
              name="sourceRetailerAddress"
              placeholder="Enter source retailer address"
              className="w-full"
              value={formData.sourceRetailerAddress}
              onChange={handleChange}
              required
            />
            <SelectComponent
              selectData={retailerData}
              onEmailChange={handleTargetEmailChange}
              onNameChange={() => {}}
              isOrderComponent={true}
            />
            <Input
              label="Target Retailer Name"
              name="TargetRetailerName"
              placeholder="Enter Target retailer name"
              className="w-full"
              value={formData.targetRetailerName}
              readOnly
            />
            <Textarea
              label="Target Retailer Address"
              name="targetRetailerAddress"
              placeholder="Enter target retailer address"
              className="w-full"
              value={formData.targetRetailerAddress}
              readOnly
            />
            {formData.products.map((product, index) => (
              <div key={index} className="space-y-2">
                <Input
                  label="Product Name"
                  name="productName"
                  placeholder="Enter product name"
                  className="w-full"
                  value={product.productName}
                  onChange={(e) => handleProductChange(e, index)}
                  required
                />
                <Input
                  label="Quantity"
                  name="quantity"
                  placeholder="Enter quantity"
                  type="number"
                  className="w-full"
                  value={product.quantity}
                  onChange={(e) => handleProductChange(e, index)}
                  required
                />
                <Input
                  label="Price"
                  name="price"
                  placeholder="Enter price"
                  type="number"
                  className="w-full"
                  value={product.price}
                  onChange={(e) => handleProductChange(e, index)}
                  required
                />
              </div>
            ))}
            <Input
              label="Supplier Email"
              name="supplierEmail"
              placeholder="Enter supplier email"
              type="email"
              className="w-full"
              value={formData.supplierEmail}
              onChange={handleChange}
              readOnly
            />
            <SelectComponent
              selectData={driverData}
              onEmailChange={handleDriverEmailChange}
              onNameChange={() => {}}
              isOrderComponent={true}
            />
            <Button
              type="submit"
              className="w-full bg-orange-500 text-white mt-4 hover:bg-black p-2"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Orders;
