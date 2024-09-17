import React, { useContext } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useGoogleAuthMutation } from "../services/authApis";
import { ServerContext } from "../context/ServerContext";
import toast from "react-hot-toast";

function RegisterLoginCommonLeft({ title, desc, googleAuthText }) {
  const [googleAuth] = useGoogleAuthMutation();
  const { setGoogleAuth } = useContext(ServerContext);

  const authWithGoogle = useGoogleLogin({
    onSuccess: async (token) => {
      let access_token = token.access_token;
      setGoogleAuth(true);
      try {
        const res = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        const json = await res.json();
        const user = {
          fullname: json.name,
          username:
            json.given_name.toLowerCase() +
            json.family_name.toLowerCase() +
            json.sub.slice(-3, -1),
          email: json.email,
          password: null,
          profile: json.picture,
        };
        const result = await googleAuth(user).unwrap();
        toast.success(result?.msg, {
          style: {
            background: "#1f2937",
            color: "#f3f4f6",
            fontSize: "14px",
            padding: "15px 20px",
            border: "1px solid #374151",
          },
        });
        localStorage.setItem("_token", result?.token);
        document.location = '/';
        setGoogleAuth(false);
      } catch (err) {
        console.error(err);
      }
    },
    flow: "implicit",
  });
  return (
    <div>
      <div className="flex items-center gap-2">
        <img className="w-6" src="../logo.png" alt="" />
        <h3 className="text-sm font-medium font-lobster tracking-wider">
          TASKBOOM
        </h3>
      </div>
      <h2 className="text-lg font-semibold mt-8">{title}</h2>
      <p className="text-xs text-gray-500 font-medium mt-2">{desc}</p>
      <button
        onClick={authWithGoogle}
        className="flex items-center justify-center w-full gap-3 bg-gray-800 py-[10px] rounded-full mt-7 border border-gray-700 active:scale-95 transition-all"
      >
        <img src="../google.png" className="w-4 h-4" alt="" />
        <span className="text-[12px] font-normal">{googleAuthText}</span>
      </button>
      <div className="h-[1px] bg-gray-800 mt-6 flex justify-center">
        <span className="text-xs bg-gray-900 px-[13px] py-[6px] -mt-[12px] rounded-full">
          or
        </span>
      </div>
    </div>
  );
}

export default RegisterLoginCommonLeft;
