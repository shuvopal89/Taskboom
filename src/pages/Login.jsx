import React, { useContext, useState, useEffect } from "react";
import Title from "../components/Title";
import { Link } from "react-router-dom";
import RegisterLoginCommonLeft from "../components/RegisterLoginCommonLeft";
import RegisterLoginCommonRight from "../components/RegisterLoginCommonRight";
import { useUserLoginMutation } from "../services/authApis";
import toast from "react-hot-toast";
import ShowErrorMsg from "../components/ShowErrorMsg";
import { ServerContext } from "../context/ServerContext";

function Login() {
  const [user, setUser] = useState({
    emailorusername: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [userLogin, { isLoading }] = useUserLoginMutation();
  const { googleAuth } = useContext(ServerContext);

  let ICS =
    "w-full py-3 px-4 text-[13px] font-medium outline-none border-2 border-gray-700 rounded-lg bg-gray-800 placeholder:text-gray-500 focus:border-gray-500 caret-gray-400";

  const formHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await userLogin(user).unwrap();
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
      setErrorMsg("");
      document.location = '/';
    } catch (err) {
      setErrorMsg(err?.data?.msg);
    }
  };

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    if (localStorage.getItem("_token")) {
      document.location = '/';
    }
  }, []);

  return (
    <div className="h-screen w-full bg-[url('../background.png')] bg-gray-900 bg-no-repeat bg-cover">
      <Title title={"Welcome Back to Taskboom"} />
      <div className="w-full h-screen flex backdrop-blur-2xl">
        {/* Register left section */}
        <div className="w-full h-screen bg-gray-900 relative border-r-[1px] border-gray-800">
          <div className="max-w-[400px] max-[900px]:px-3 text-gray-200 h-max absolute top-0 left-0 right-0 bottom-0 m-auto">
            <RegisterLoginCommonLeft
              title={"Welcome back"}
              desc={
                "Keep in track on your journey and boost your productivity."
              }
              googleAuthText={"Signin with google"}
            />
            {errorMsg && <ShowErrorMsg errorMsg={errorMsg} />}
            <form
              onSubmit={formHandler}
              className="mt-6 grid grid-cols-1 gap-3"
            >
              <input
                className={`${ICS} col-span-2`}
                onChange={inputHandler}
                type="text"
                name="emailorusername"
                placeholder="Email or Username"
                value={user.emailorusername}
              />
              <input
                className={`${ICS} col-span-2`}
                onChange={inputHandler}
                type="password"
                name="password"
                placeholder="Password"
                value={user.password}
              />
              <button
                className="col-span-2 hover:cursor-pointer active:scale-95 transition-all bg-green-500 py-3 mt-3 flex items-center justify-center gap-2 font-semibold rounded-full text-gray-900 text-[13px]"
                type="submit"
              >
                {
                  (isLoading || googleAuth) ? (
                    <div className="h-[18px] w-[18px] border-[2.8px] border-t-gray-950 border-r-gray-950 border-b-gray-950 border-l-transparent animate-spin rounded-full"></div>
                  ) : <span>Login</span>
                }
              </button>
            </form>
            <p className="text-[13px] text-center mt-5">
              Don't have an account?{" "}
              <Link className="text-blue-500 underline" to={"/auth/register"}>
                Register
              </Link>
            </p>
          </div>
        </div>
        {/* Register right section */}
        <RegisterLoginCommonRight />
      </div>
    </div>
  );
}

export default Login;
