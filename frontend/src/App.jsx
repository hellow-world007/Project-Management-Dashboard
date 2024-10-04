/* eslint-disable no-empty */
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import Layout from "./components/layout/Layout";
import Error from "./shared/components/UIElements/Error";
import NotFound from "./shared/components/UIElements/NotFound";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ProductPage from "./pages/dashboard/ProductPage";
import CustomerPage from "./pages/dashboard/CustomerPage";
import TransactionsPage from "./pages/dashboard/TransactionsPage";
import OverviewPage from "./pages/dashboard/OverviewPage";
import DailyPage from "./pages/dashboard/DailyPage";
import MonthlyPage from "./pages/dashboard/MonthlyPage";
import BreakdownPage from "./pages/dashboard/BreakdownPage";
import AdminPage from "./pages/dashboard/AdminPage";
import PerformancePage from "./pages/dashboard/PerformancePage";
import RootPage from "./pages/dashboard/RootPage";
import GeographyPage from "./pages/dashboard/GeographyPage";
import { AppContext } from "./shared/context/app-context";
import { useHttpClient } from "./shared/hooks/http-hook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <RootPage />,
        children: [
          {
            path: "dashboard",
            element: <DashboardPage />,
            errorElement: <Error />,
          },
          {
            path: "products",
            element: <ProductPage />,
            errorElement: <Error />,
          },
          {
            path: "customers",
            element: <CustomerPage />,
            errorElement: <Error />,
          },
          {
            path: "transactions",
            element: <TransactionsPage />,
            errorElement: <Error />,
          },
          {
            path: "geography",
            element: <GeographyPage />,
            errorElement: <Error />,
          },
          {
            path: "overview",
            element: <OverviewPage />,
            errorElement: <Error />,
          },
          {
            path: "daily",
            element: <DailyPage />,
            errorElement: <Error />,
          },
          {
            path: "monthly",
            element: <MonthlyPage />,
            errorElement: <Error />,
          },
          {
            path: "breakdown",
            element: <BreakdownPage />,
            errorElement: <Error />,
          },
          {
            path: "admin",
            element: <AdminPage />,
            errorElement: <Error />,
          },
          {
            path: "performance",
            element: <PerformancePage />,
            errorElement: <Error />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  const [loggedInUser, setLoggedInUser] = useState();
  const [salesData, setSalesData] = useState(null);
  const { userId } = useContext(AppContext);
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/sales/overviews`
        );

        setSalesData(responseData.overallStats);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, [sendRequest]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/general/${userId}`
        );

        setLoggedInUser(responseData.user);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest, userId]);

  return (
    <AppContext.Provider
      value={{
        userId: "63701cc1f03239b7f700000e",
        loggedInUser: loggedInUser || {},
        setLoggedInUser: setLoggedInUser,
        salesData: salesData,
      }}
    >
      <RouterProvider router={router} />;
    </AppContext.Provider>
  );
}

export default App;
