import React, { useContext, useEffect } from "react";
import { homeRoutes } from "../utils/utils";
import MenuNavigationItem from "../components/MenuNavigationItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Outlet } from "react-router-dom";
import RightHeaderSection from "../components/RightHeaderSection";
import BottomTab from "../components/BottomTab";
import { DesignContext } from "../context/DesignContext";
import DashboardAccountPopup from "../components/popup/DashboardAccountPopup";
import LogoutPopup from "../components/popup/LogoutPopup";
import CreateLabelPopup from "../components/popup/CreateLabelPopup";
import DeletePopup from "../components/popup/DeletePopup";
import SettingsPopup from "../components/popup/SettingsPopup";
import Logo from "../components/Logo";
import SessionPopup from "../components/popup/SessionPopup";
import { useGetUserQuery } from "../services/authApis";
import ShowTaskPopup from "../components/popup/ShowTaskPopup";
import DeleteAccountPopup from "../components/popup/DeleteAccountPopup";
import { useGetOptQuery } from "../services/taskApis";

function Home() {
  const {
    dashboardAccountPopup,
    logoutPopup,
    setLogoutPopup,
    createLabelPopup,
    deletePopup,
    settingsPopup,
    showTaskPopup,
    deleteAccountPopup
  } = useContext(DesignContext);
  const { isError, isLoading, refetch } = useGetUserQuery();
  const { data } = useGetOptQuery()

  const logoutHandler = () => {
    setLogoutPopup(true);
    setTimeout(() => {
      setLogoutPopup(false);
      localStorage.removeItem("_token");
      document.location = '/auth/login';
    }, 2000);
  };

  useEffect(() => {
    window.addEventListener("storage", () => {
      refetch();
    });
  }, [localStorage.getItem("_token")]);

  useEffect(() => {
    if (!localStorage.getItem("_token")) {
      document.location = '/auth/login';
    }
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-screen bg-gray-900 grid place-items-center">
        <div className="h-[35px] w-[35px] border-[3px] border-t-green-500 border-r-green-500 border-b-green-500 border-l-transparent animate-spin rounded-full"></div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full bg-gray-900 select-none">
        <div className="max-w-[1600px] relative m-auto bg-gray-900 h-screen flex border-l border-r border-gray-900 min-[1600px]:border-gray-800">
          {/* Home page left menu section */}
          <div className="w-[250px] max-lg:w-[65px] max-md:hidden sticky top-0 h-screen border-r border-gray-800 flex flex-col justify-between select-none">
            {/* Left menu logo and routes section */}
            <div>
              {/* Left menu logo section */}
              <Logo />
              {/* Left menu routes section */}
              <div className="flex flex-col px-2 mt-5 gap-2">
                {homeRoutes.map((item, index) => {
                  return (
                    <MenuNavigationItem
                      key={index}
                      icon={item.icon}
                      title={item.title}
                      link={item.link}
                    />
                  );
                })}
              </div>
            </div>
            {/* Home left menu logout section */}
            <div className="px-2 pb-5">
              <button
                onClick={logoutHandler}
                className="flex w-full items-center gap-3 p-3 px-4 text-gray-200 border-gray-900 border rounded-full bg-gradient-to-r hover:from-gray-800 hover:to-gray-900 hover:border-gray-800 max-lg:rounded-lg max-lg:px-3 group active:opacity-50"
              >
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  className="text-xl text-gray-200 group-hover:scale-110"
                />
                <p className="text-sm max-lg:hidden">Logout</p>
              </button>
            </div>
          </div>
          {/* Home page right data section */}
          <div className="h-screen text-gray-200 homePageRightSection overflow-y-scroll">
            {/* Right header section */}
            <div className="sticky top-0 z-10">
              <RightHeaderSection />
            </div>
            {/* Right middle section */}
            <div className="max-md:pb-[57px]">
              <Outlet />
            </div>
            {/* Right bottom navigation section */}
            <div className="w-full hidden max-md:block bg-gray-900 p-2 border-t border-gray-800 fixed bottom-0">
              <div className="flex justify-around items-center">
                {homeRoutes
                  .filter((item) => item.title !== "Create Task")
                  .map((item, index) => (
                    <BottomTab key={index} icon={item.icon} link={item.link} />
                  ))}
              </div>
            </div>
          </div>

          {dashboardAccountPopup && <DashboardAccountPopup />}
        </div>
      </div>

      {/* All popup center */}
      {logoutPopup && <LogoutPopup />}
      {createLabelPopup && <CreateLabelPopup />}
      {deletePopup && <DeletePopup />}
      {settingsPopup && <SettingsPopup _iAB={data?.opt?._iAB} _iE={data?.opt?._iE} _iR={data?.opt?._iR} />}
      {isError && <SessionPopup />}
      {showTaskPopup && <ShowTaskPopup />}
      {deleteAccountPopup && <DeleteAccountPopup />}
    </>
  );
}

export default Home;
