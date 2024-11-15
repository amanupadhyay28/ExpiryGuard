import { useEffect, useState } from "react";
import Cards from "./Cards";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
  Legend,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "../../components/ui/dialog";

import { useGetExpiringProductsMutation } from "../../services/common/index";

import { useGetSalesDtaMutation } from "../../services/common/index";
import Loader from "./Loader";

const Dashboard = () => {
  const [getSalesData, { isLoading }] = useGetSalesDtaMutation();
  const [retaileSalesData, setretaileSalesData] = useState(null);
  const retailerEmail = localStorage.getItem("email");

  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(true);
  const [getExpiringProducts, { isLoading: isExpiringLoading }] =
    useGetExpiringProductsMutation();
  const [expiringProducts, setExpiringProducts] = useState(0);
  const userType = useSelector((state) => state.auth.userType);
  useEffect(() => {
    try {
      getSalesData({ retailerEmail })
        .unwrap()
        .then((response) => {
          setretaileSalesData(response);
        })
        .catch((error) => console.error("Error fetching retailers:", error));
    } catch (error) {
      console.error(`No supplier data found ${error}`);
    }
  }, [getSalesData]);

  useEffect(() => {
    try {
      getExpiringProducts({ retailerEmail })
        .unwrap()
        .then((response) => {
          setExpiringProducts(response.expiringProductCount);
        })
        .catch((error) =>
          console.error("Error fetching expiring products:", error)
        );
    } catch (error) {
      console.error(`No expiring products found ${error}`);
    }
  }, [getExpiringProducts]);

  if (isLoading || !retaileSalesData) {
    return <Loader />;
  }

  const { monthlySales, monthlyRevenue, topSellingProducts, salesByProduct } =
    retaileSalesData;

  const salesData = Object.keys(monthlySales).map((month) => ({
    month,
    sales: monthlySales[month],
    revenue: monthlyRevenue[month],
  }));

  const salesByProductData = Object.entries(salesByProduct).map(
    ([product, sales]) => ({
      product,
      sales,
    })
  );

  const topSellingProductsData = topSellingProducts
    .map(([product, quantity]) => ({
      product,
      quantity,
    }))
    .slice(0, 5);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth() + 1;
  const monthYearDate = `${currentMonth}-${currentYear}`;

  const totalSales = salesData.reduce((acc, curr) => acc + curr.sales, 0);
  const totalRevenue = salesData.reduce((acc, curr) => acc + curr.revenue, 0);
  const monthlySalesValue = monthlySales[monthYearDate] || 0;
  const monthlyRevenueValue = monthlyRevenue[monthYearDate] || 0;

  return (
    <div>
      {/* Dialog modal */}
      {userType === "retailer" && (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="bg-primary w-[900px] h-[300px]">
            <div className="bg-white m-[-18px] rounded-md flex justify-center items-center ">
              <h1 className="text-6xl   text-red-600 font-bold text-center py-2 ">
                !! ALERT !!
              </h1>
            </div>
            <h1 className="text-3xl  mb-4 text-white font-extrabold text-center mt-6 ">
              Expiring Products
            </h1>
            <div className="text-center text-white text-2xl">
              {expiringProducts > 0 ? (
                <p>
                  You have{" "}
                  <span
                    className="text-orange-400 font-semibold hover:underline cursor-pointer"
                    onClick={() => navigate("/inventory")}
                  >
                    {expiringProducts === 1
                      ? `${expiringProducts} product `
                      : `${expiringProducts} products `}
                  </span>
                  expiring within a week.
                </p>
              ) : (
                <p>No products are expiring within a week.</p>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      <Cards
        salesData={{
          totalSales,
          totalRevenue,
          monthlySales: monthlySalesValue,
          monthlyRevenue: monthlyRevenueValue,
        }}
      />
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Overview with Bar Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#FF7F50" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Overview with Line Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-1 gap-6">
        {/* Sales by Product with Line Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Sales by Product</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesByProductData}>
              <XAxis dataKey="product" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#82ca9d"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* Top Selling Products with Horizontal Bar Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Top 5 Selling Products</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={topSellingProductsData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis type="number" />
              <YAxis type="category" dataKey="product" />
              <Tooltip />
              <Legend />
              <Bar dataKey="quantity" fill="#8884d8">
                {topSellingProductsData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
