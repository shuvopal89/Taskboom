import React from "react";
import { useGetUserQuery } from "../services/authApis";

function ShowProfile({ isHidden }) {
  const { data } = useGetUserQuery();
  return (
    <div className="flex items-center gap-2 max-md:active:scale-90 transition-all select-none">
      <div className="h-9 w-9 max-md:w-10 max-md:h-10 bg-gray-800 rounded-full flex justify-center items-center border border-gray-700">
        {data?.user?.profile !== null ? (
          <img
            className="h-7 w-7 max-md:w-8 max-md:h-8 flex-shrink-0 rounded-full object-cover"
            src={data?.user?.profile}
            alt="profile image"
          />
        ) : (
          <div className="h-7 w-7 rounded-full grid place-items-center bg-green-500">
            <p className="text-sm font-medium text-gray-900">
              {data?.user?.fullname?.slice(0, 1)}
            </p>
          </div>
        )}
      </div>
      <div className={`flex flex-col ${isHidden && "max-md:hidden"}`}>
        <span className="text-xs font-normal text-gray-200">
          {data?.user?.fullname}
        </span>
        <span className="text-[11px] text-gray-500 font-normal">
          {data?.user?.username}
        </span>
      </div>
    </div>
  );
}

export default ShowProfile;
