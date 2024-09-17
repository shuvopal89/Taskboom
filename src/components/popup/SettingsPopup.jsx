import React, { useContext } from "react";
import { DesignContext } from "../../context/DesignContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import SwitchItem from "../SwitchItem";
import { useGetUserQuery } from "../../services/authApis";

function SettingsPopup({ _iAB, _iE, _iR }) {
  const { settingsPopup, setSettingsPopup, setDeleteAccountPopup} = useContext(DesignContext);
  const { data: userInfo } = useGetUserQuery(); 

  const handler = (e) => e.target.classList.contains("parent") && setSettingsPopup(false);

  const settingsOptions = [
    {
      id: 1,
      title: "Add new task to the bottom",
      value: _iAB,
    },
    {
      id: 2,
      title: "Expand tasks options",
      value: _iE,
    },
    {
      id: 3,
      title: "Redirect after creating a task.",
      value: _iR,
    },
  ];

  return (
    <div
      className="w-full h-screen z-20 fixed top-0 parent bg-gray-900/70"
      onClick={handler}
    >
      <div
        className={`${settingsPopup ? "scaleAnimShow" : ""
          } max-w-[450px] h-screen border-l border-r border-gray-700 bg-gray-800 m-auto px-5 py-3 text-gray-200`}
      >
        {/* Profile back icon */}
        <FontAwesomeIcon
          icon={faXmark}
          onClick={() => setSettingsPopup(false)}
          className="text-xl text-gray-200 hover:cursor-pointer py-[11px] px-3 rounded-full border border-gray-800 active:border-gray-600 active:bg-gray-700 transition-all"
        />

        {/* Profile info section */}
        <div className="flex items-center justify-center flex-col gap-2">
          <div className="w-32 h-32 rounded-full grid place-items-center bg-gray-700 select-none">
            {userInfo?.user?.profile !== null ? (
              <img
                className="h-28 w-28 rounded-full object-cover animate-pulse"
                src={userInfo?.user?.profile}
                alt=""
              />
            ) : (
              <div className="h-28 w-28 rounded-full grid place-items-center bg-green-500 animate-pulse">
                <p className="text-4xl font-medium text-gray-900">
                  {userInfo?.user?.fullname?.slice(0, 1)}
                </p>
              </div>
            )}
          </div>
          <div className="grid place-items-center mt-1 gap-1">
            <div>
              <h3 className="text-lg font-bold text-gray-200">
                {userInfo?.user?.fullname}
              </h3>
            </div>
            <p className="text-xs font-normal text-gray-500">
              {userInfo?.user?.username}
            </p>
            <p className="text-[11px] font-normal text-gray-500">
              {userInfo?.user?.email}
            </p>
          </div>
        </div>

        {/* Profile settings section */}
        <div className="mt-4 divide-y divide-gray-700">
          {settingsOptions.map((item, index) => {
            return (
              <SwitchItem
                key={index}
                id={item.id}
                title={item.title}
                value={item.value}
                bgActive={"bg-gray-200"}
                bgInactive={"bg-gray-700"}
                circleActive={"bg-gray-950"}
                circleInactive={"bg-gray-950"}
              />
            );
          })}
        </div>

        {/* Delete account section */}
        <button onClick={() => setDeleteAccountPopup(true)} className="text-[13px] w-full bg-red-500 active:scale-95 transition-all py-[10px] mt-3 rounded-full text-gray-900 font-semibold">
          Remove account
        </button>
      </div>
    </div>
  );
}

export default SettingsPopup;
