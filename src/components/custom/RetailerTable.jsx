function RetailerTable({ onSelectRetailer }) {
  const retailers = [
    {
      name: "Radhey Shyam",
      address: "Sector 62 Noida",
      contact: "123-456-7890",
      status: "Online",
    },
    {
      name: "Mohit Garg",
      address: "Sector 61 Noida",
      contact: "987-654-3210",
      status: "Offline",
    },
    {
      name: "Anil Kumar",
      address: "Sector 61 Noida",
      contact: "987-654-000",
      status: "Online",
    },
    {
      name: "AJit Kumar",
      address: "Sector 59 Noida",
      contact: "987-654-2222",
      status: "Online",
    },
    {
      name: "Anubhav Sharma",
      address: "Sector 34 Noida",
      contact: "987-654-1223",
      status: "Online",
    },
    {
      name: "Aman Sharma",
      address: "Sector 3 Noida",
      contact: "821-654-3210",
      status: "Offline",
    },
    {
      name: "Lagan Rana",
      address: "Sector 114 Noida",
      contact: "987-632-122",
      status: "Offline",
    },
    {
      name: "Kushal Garg",
      address: "Sector 51 Noida",
      contact: "987-654-1310",
      status: "Online",
    },
    {
      name: "Kushal Garg",
      address: "Sector 51 Noida",
      contact: "987-654-1310",
      status: "Online",
    },
    {
      name: "Kushal Garg",
      address: "Sector 51 Noida",
      contact: "987-654-1310",
      status: "Online",
    },
    {
      name: "Kushal Garg",
      address: "Sector 51 Noida",
      contact: "987-654-1310",
      status: "Online",
    },
  ];

  return (
    <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
      <table className="min-w-full text-left text-sm text-gray-800">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-6 py-3 text-gray-700 font-semibold">
              Retailer Name
            </th>
            <th className="px-6 py-3 text-gray-700 font-semibold">Address</th>
            <th className="px-6 py-3 text-gray-700 font-semibold">Contact</th>
            <th className="px-6 py-3 text-gray-700 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {retailers.map((retailer, index) => (
            <tr
              key={index}
              className="border-b hover:bg-orange-100 cursor-pointer transition-colors duration-300 ease-in-out"
              onClick={() => onSelectRetailer(retailer)}
            >
              <td className="px-6 py-4 font-medium">{retailer.name}</td>
              <td className="px-6 py-4">{retailer.address}</td>
              <td className="px-6 py-4">{retailer.contact}</td>
              <td className="px-6 py-4">{retailer.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RetailerTable;
