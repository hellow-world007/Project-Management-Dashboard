import { useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import OverviewChart from "../../components/sales/OverviewChart";
import BreakdownChart from "../../components/sales/BreakdownChart";
import Loader from "../../components/skeletons/Loader";
import { useCounter } from "../../shared/hooks/useCounter";
import CircularProgressBar from "../../components/bar/CircularProgressBar";

const DashboardPage = () => {
  const [dashboard, setDashboard] = useState(null);
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/general/dashboard`
        );

        setDashboard(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, [sendRequest]);

  const totalCustomers = useCounter(dashboard?.totalCustomers || 0);
  const todaySales = useCounter(dashboard?.todayStats.totalSales || 0);
  const monthlySales = useCounter(dashboard?.thisMonthStats.totalSales || 0);
  const yearlySales = useCounter(dashboard?.yearlySalesTotal || 0);

  return (
    <div>
      <div className="flex items-center justify-between max-md:flex-col max-md:gap-5 max-md:items-start pb-4">
        <div className="flex flex-col justify-center">
          <p className="header">Dashboard</p>
          <p className="text-xl font-inter text-dark-grey dark:text-[#f0f0f0]">
            Welcome to your dashboard
          </p>
        </div>
        <button className="btn-yellow">Download Reports</button>
      </div>

      {dashboard === null && (
        <div className="center">
          <Loader />
        </div>
      )}

      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 text-dark-grey dark:text-[#f0f0f0]">
          <div className="bg-[#e0e0e0] dark:bg-[#21295c] p-6 rounded-lg flex items-center gap-5">
            <div>
              <p className="text-gray-400">Total Customers</p>
              <h2 className="text-4xl font-bold">{totalCustomers}</h2>
              <p className="mt-2">
                <span className="font-bold">+14% </span>
                <span className="text-[#991f1f] dark:text-[#fab1a0]">
                  Since last month
                </span>
              </p>
            </div>

            <CircularProgressBar percentage={14} color="#3b82f6" />
          </div>

          <div className="bg-[#e0e0e0] dark:bg-[#21295c] p-6 rounded-lg flex items-center gap-5">
            <div>
              <p className="text-gray-400">Sales Today</p>
              <h2 className="text-4xl font-bold">{todaySales}</h2>
              <p className="mt-2">
                <span className="font-bold">+21% </span>
                <span className="text-[#991f1f] dark:text-[#fab1a0]">
                  Since last month
                </span>
              </p>
            </div>

            <CircularProgressBar percentage={21} color="#8E44AD" />
          </div>

          <div className="bg-[#e0e0e0] dark:bg-[#21295c] p-6 rounded-lg flex items-center gap-5">
            <div>
              <p className="text-gray-400">Monthly Sales</p>
              <h2 className="text-4xl font-bold">{monthlySales}</h2>
              <p className="mt-2">
                <span className="font-bold">+5% </span>
                <span className="text-[#991f1f] dark:text-[#fab1a0]">
                  Since last month
                </span>
              </p>
            </div>

            <CircularProgressBar percentage={5} color="#FF6F61" />
          </div>

          <div className="bg-[#e0e0e0] dark:bg-[#21295c] p-6 rounded-lg flex items-center gap-5">
            <div>
              <p className="text-gray-400">Yearly Sales</p>
              <h2 className="text-4xl font-bold">{yearlySales}</h2>
              <p className="mt-2">
                <span className="font-bold">+43% </span>
                <span className="text-[#991f1f] dark:text-[#fab1a0]">
                  Since last month
                </span>
              </p>
            </div>

            <CircularProgressBar percentage={43} color="#FFD700" />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 p-6 rounded-lg bg-[#e0e0e0] dark:bg-[#21295c]">
            <h3 className="text-lg font-semibold mb-4 text-dark-grey dark:text-[#f0f0f0]">
              Sales Over Time
            </h3>
            <div className="w-full h-96 rounded-lg">
              <OverviewChart isDashboard={true} selected="Sales" />
            </div>
          </div>

          <div className="p-6 rounded-lg bg-[#e0e0e0] dark:bg-[#21295c]">
            <h3 className="text-lg font-semibold mb-4 text-dark-grey dark:text-[#f0f0f0]">
              Sales By Category
            </h3>
            <div className="w-full h-96 rounded-lg">
              <BreakdownChart isDashboard="true" />
            </div>
          </div>
        </div>

        {dashboard !== null && dashboard.transactions.length ? (
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full text-left text-dark-grey dark:text-[#f3f3f3]">
              <thead className="text-white dark:text-black bg-[#8b46ff] dark:bg-[#cca752]">
                <tr>
                  <th className="px-4 py-4">ID</th>
                  <th className="px-4 py-4">User ID</th>
                  <th className="px-4 py-4">createdAt</th>
                  <th className="px-4 py-4"># of Products</th>
                  <th className="px-4 py-4">Cost</th>
                </tr>
              </thead>
              <tbody className="bg-[#e0e0e0] dark:bg-[#21295c]">
                {dashboard.transactions.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-4">{item._id}</td>
                    <td className="px-4 py-4">{item.userId}</td>
                    <td className="px-4 py-4">{item.joinedAt}</td>
                    <td className="px-4 py-4">{item.products.length}</td>
                    <td className="px-4 py-4">{item.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
