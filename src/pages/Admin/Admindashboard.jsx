import { useGetAdminDataMutation } from "../../services/common/index";
import { useState, useEffect } from "react";

const Admindashboard = () => {
  const [getAdmindata] = useGetAdminDataMutation();
  const [adminData, setAdminData] = useState([]);

  useEffect(() => {
    getAdmindata({})
      .unwrap()
      .then((response) => {
        const dataArray = Array.isArray(response) ? response : [response];
        setAdminData(dataArray);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [getAdmindata]);

  return (
    <div className="p-4 bg-gray-50">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Admin Dashboard
      </h1>

      {/* Suppliers Section */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Suppliers</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="px-4 py-3">Supplier ID</th>
              <th className="px-4 py-3">Supplier Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone Number</th>
              <th className="px-4 py-3">Company Name</th>
              <th className="px-4 py-3">Commodity Sold</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {adminData.map((item) =>
              item.suppliers.map((supplier, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-100 transition-colors"
                >
                  <td className="px-4 py-3">{supplier.supplierId}</td>
                  <td className="px-4 py-3">{supplier.name}</td>
                  <td className="px-4 py-3">{supplier.email}</td>
                  <td className="px-4 py-3">{supplier.phoneNumber}</td>
                  <td className="px-4 py-3">{supplier.companyName || "N/A"}</td>
                  <td className="px-4 py-3">
                    {supplier.commoditySold || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() =>
                        console.log("Delete supplier with ID:", supplier._id)
                      }
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Retailers Section */}
      <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">
        Retailers
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-green-600 text-white text-left">
              <th className="px-4 py-3">Retailer ID</th>
              <th className="px-4 py-3">Retailer Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone Number</th>
              <th className="px-4 py-3">Address</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {adminData.map((item) =>
              item.retailers.map((retailer, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-100 transition-colors"
                >
                  <td className="px-4 py-3">{retailer.retailerId}</td>
                  <td className="px-4 py-3">{retailer.name}</td>
                  <td className="px-4 py-3">{retailer.email}</td>
                  <td className="px-4 py-3">{retailer.phoneNumber}</td>
                  <td className="px-4 py-3">{retailer.address}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() =>
                        console.log("Delete retailer with ID:", retailer._id)
                      }
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admindashboard;
