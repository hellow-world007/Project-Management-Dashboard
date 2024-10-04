/* eslint-disable react/jsx-key */
import { useContext, useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import { NavLink, Outlet } from "react-router-dom";
import { AppContext } from "../../shared/context/app-context";

const RootPage = () => {
  const { loggedInUser } = useContext(AppContext);
  const [pageState, setPageState] = useState(null);
  const routes = [
    <i className="fi fi-br-bars-staggered text-dark-grey dark:text-white"></i>,
    pageState || "Dashboard",
  ];

  let { name, occupation } = loggedInUser;

  const stateRef = useRef();

  const [navIndex, setNavIndex] = useState(0);
  const [showSideNav, setShowSideNav] = useState(false);

  const changeNavigation = (index) => {
    if (index === 0) {
      setNavIndex(0);
      setShowSideNav(true);
    } else {
      setNavIndex(1);
      setShowSideNav(false);
    }
  };

  useEffect(() => {
    setShowSideNav(false);
    stateRef.current.click();
  }, [pageState]);

  return (
    <div className="w-full h-cover flex justify-center max-md:flex-col relative">
      <Toaster />
      <div className="w-full md:w-1/4 lg:w-1/6 h-cover md:sticky">
        <div className="relative border-b border-grey flex flex-nowrap overflow-x-auto transition-all duration-200 md:hidden max-md:sticky max-md:top-[80px] z-40 bg-[#e0e0e0] dark:bg-[#21295c]">
          {routes.map((route, index) => {
            return (
              <button
                onClick={() => changeNavigation(index)}
                key={index}
                ref={index === 1 ? stateRef : null}
                className={`p-4 px-6 capitalize ${
                  navIndex === index
                    ? "text-white border-b-2  border-dark-grey"
                    : "text-dark-grey dark:text-white"
                }`}
              >
                {route}
              </button>
            );
          })}
        </div>

        <div
          className={`relative h-cover z-30 bg-[#e0e0e0] dark:bg-[#21295c] md:sticky md:top-[80px] 
            md:left-0 max-md:sticky max-md:top-[80px] max-md:left-0 ${
              showSideNav ? "max-md:block" : "max-md:hidden"
            }`}
        >
          <NavLink
            className="sidebar-link"
            to="/dashboard"
            onClick={(e) => setPageState(e.target.innerText)}
          >
            <i className="fi fi-rs-house-chimney"></i>
            Dashboard
          </NavLink>
          <hr className="border-[#991f1f] dark:border-[#fab1a0] mb-2" />
          <div className="">
            <p className="py-3 pl-10 capitalize text-[#991f1f] dark:text-[#fab1a0]">
              Client fetching
            </p>

            <NavLink
              className="sidebar-link"
              to="/products"
              onClick={(e) => setPageState(e.target.innerText)}
            >
              <i className="fi fi-rr-shopping-cart"></i>
              Products
            </NavLink>

            <NavLink
              className="sidebar-link"
              to="/customers"
              onClick={(e) => setPageState(e.target.innerText)}
            >
              <i className="fi fi-sr-users"></i>
              Customers
            </NavLink>

            <NavLink
              className="sidebar-link"
              to="/transactions"
              onClick={(e) => setPageState(e.target.innerText)}
            >
              <i className="fi fi-rr-receipt"></i>
              Transactions
            </NavLink>
            <NavLink
              className="sidebar-link"
              to="/geography"
              onClick={(e) => setPageState(e.target.innerText)}
            >
              <i className="fi fi-br-world"></i>
              Geography
            </NavLink>
          </div>

          <div className="">
            <p className="py-3 pl-10 capitalize text-[#991f1f] dark:text-[#fab1a0]">
              Sales
            </p>

            <NavLink
              className="sidebar-link"
              to="/overview"
              onClick={(e) => setPageState(e.target.innerText)}
            >
              <i className="fi fi-br-description-alt"></i>
              Overview
            </NavLink>

            <NavLink
              className="sidebar-link"
              to="/daily"
              onClick={(e) => setPageState(e.target.innerText)}
            >
              <i className="fi fi-rs-calendar"></i>
              Daily
            </NavLink>

            <NavLink
              className="sidebar-link"
              to="/monthly"
              onClick={(e) => setPageState(e.target.innerText)}
            >
              <i className="fi fi-rr-calendar"></i>
              Monthly
            </NavLink>
            <NavLink
              className="sidebar-link"
              to="/breakdown"
              onClick={(e) => setPageState(e.target.innerText)}
            >
              <i className="fi fi-br-chat-arrow-down"></i>
              Breakdown
            </NavLink>
          </div>

          <div className="">
            <p className="py-3 pl-10 capitalize text-[#991f1f] dark:text-[#fab1a0]">
              Management
            </p>

            <NavLink
              className="sidebar-link"
              to="/admin"
              onClick={(e) => setPageState(e.target.innerText)}
            >
              <i className="fi fi-ss-admin-alt"></i>
              Admin
            </NavLink>

            <NavLink
              className="sidebar-link"
              to="/performance"
              onClick={(e) => setPageState(e.target.innerText)}
            >
              <i className="fi fi-sr-chart-histogram"></i>
              Performance
            </NavLink>
          </div>

          <div className="flex gap-5 items-center justify-center border-t-2 border-[#991f1f] dark:border-[#fab1a0] bg-[#e0e0e0] dark:bg-[#21295c] p-4 px-6 z-50 w-full md:w-1/4 lg:w-1/6 fixed bottom-0 mx-auto">
            <div className="avatar online">
              <div className="w-12 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-[#242424] dark:text-[#ffffff]">{name}</p>
              <p className="text-[#991f1f] dark:text-[#f1acc9]">{occupation}</p>
            </div>

            <div>
              <i className="fi fi-rr-caret-down text-2xl text-[#991f1f] dark:text-[#f1acc9]"></i>
            </div>
          </div>
        </div>
        <div
          className={`p-4 md:hidden md:pr-0 ${!showSideNav ? "show" : "hide"}`}
        >
          <Outlet />
        </div>
      </div>

      <div className="w-full md:w-3/4 lg:w-5/6 h-cover p-4 mx-auto hidden md:block px-10">
        <Outlet />
      </div>
    </div>
  );
};

export default RootPage;
