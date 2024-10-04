import { useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Loader from "../../components/skeletons/Loader";

const TransactionPage = () => {
  const [transactions, setTransactions] = useState(null);
  const { sendRequest } = useHttpClient();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const responseData = await sendRequest(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_URL
          }/api/client/transactions?page=${page}&limit=10`
        );
        setTransactions(responseData.transactions);
        setTotalPages(responseData.totalPages);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTransactions();
  }, [sendRequest, page]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between max-md:flex-col max-md:gap-5 max-md:items-start pb-4">
        <div className="flex flex-col justify-center">
          <p className="header">Transactions</p>
          <p className="text-xl font-inter text-dark-grey dark:text-[#f0f0f0]">
            List of transactions
          </p>
        </div>
      </div>
      {transactions === null && (
        <div className="center">
          <Loader />
        </div>
      )}

      {transactions !== null ? (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-dark-grey dark:text-[#f3f3f3]">
            <thead className="text-white dark:text-black bg-[#8b46ff] dark:bg-[#cca752]">
              <tr>
                <th className="px-4 py-4">ID</th>
                <th className="px-4 py-4">User ID</th>
                <th className="px-4 py-4">CreatedAt</th>
                <th className="px-4 py-4"># of Products</th>
                <th className="px-4 py-4">Cost</th>
              </tr>
            </thead>
            <tbody className="bg-[#e0e0e0] dark:bg-[#21295c]">
              {transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td className="px-4 py-4">{transaction._id}</td>
                  <td className="px-4 py-4">{transaction.userId}</td>
                  <td className="px-4 py-4">
                    {new Date(transaction.joinedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4">{transaction.products.length}</td>
                  <td className="px-4 py-4">{transaction.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="p-4 flex gap-10 items-center justify-center text-white dark:text-black bg-[#8b46ff] dark:bg-[#cca752]">
            <span className="text-xl font-inter font-semibold">
              Page {page} of {totalPages}
            </span>

            <div className="flex gap-5">
              <button
                onClick={handlePreviousPage}
                className={`${
                  page === 1 ? "cursor-not-allowed opacity-50" : ""
                }`}
                disabled={page === 1}
              >
                <i className="fi fi-bs-angle-left text-xl"></i>
              </button>

              <button
                onClick={handleNextPage}
                className={`${
                  page === totalPages ? "cursor-not-allowed opacity-50" : ""
                }`}
                disabled={page === totalPages}
              >
                <i className="fi fi-bs-angle-right text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default TransactionPage;
