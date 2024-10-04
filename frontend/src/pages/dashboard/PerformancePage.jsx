import { useContext, useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Loader from "../../components/skeletons/Loader";
import { AppContext } from "../../shared/context/app-context";

const PerformancePage = () => {
  const [performance, setPerformance] = useState(null);
  const { userId } = useContext(AppContext);
  const { sendRequest } = useHttpClient();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_URL
          }/api/management/performance/${userId}`
        );

        setPerformance(responseData.sales);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, [sendRequest, userId]);

  return (
    <div>
      <div className="flex items-center justify-between max-md:flex-col max-md:gap-5 max-md:items-start pb-4">
        <div className="flex flex-col justify-center">
          <p className="header">PERFORMANCE</p>
          <p className="text-xl font-inter text-dark-grey dark:text-[#f0f0f0]">
            Track your Affiliate Sales Performance Here
          </p>
        </div>
        <div>
          <label className="input outline-none flex items-center text-black dark:text-white bg-[#e0e0e0] dark:bg-[#21295c] gap-2 w-full">
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              className="grow"
              placeholder="Search..."
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-6 w-6 opacity-70 text-dark-grey dark:text-white text-2xl"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
      </div>
      {performance === null && (
        <div className="center">
          <Loader />
        </div>
      )}

      {performance !== null ? (
        <div className="overflow-x-auto">
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
              {performance
                .filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item.name.toLowerCase().includes(search);
                })
                .map((item) => (
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
  );
};

export default PerformancePage;
