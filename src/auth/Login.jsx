import Logo from "../Logo.jsx";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { failure, loading, delay, calculateBMI } from "../utils";

export default function Login() {
  let [email, setEmail] = useState("");
  let [password, setPass] = useState("");
  let [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    await delay(1500);
    axios
      .post("/api/auth/signin", {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.accessToken);
        if (!res.data?.name) {
          navigate("/profile");
          return;
        }
        localStorage.clear();
        [("name", "age", "weight", "height", "gender")].forEach((field) =>
          localStorage.setItem(field, res.data[field])
        );
        calculateBMI(res.data.height, res.data.weight);
        navigate("/diet");
        navigate(0);
      })
      .catch((error) => {
        failure("Incorrect Email or Password");
        setLoading(false);
        console.error(error);
      });

    return true;
  }

  return (
    <>
      <ToastContainer />
      <section className="bg-gray-900 min-h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Logo />
          <div className="w-full  rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className=" border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="name@company.com"
                    required={true}
                    value={email}
                    onInput={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium  text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    className=" border   rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    required={true}
                    value={password}
                    onInput={(event) => setPass(event.target.value)}
                  />
                </div>
                <br></br>
                <button
                  type="submit"
                  className="w-full text-white  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                >
                  {loading(isLoading, <span>Sign in</span>)}
                </button>
                <div className="text-sm font-light  text-gray-400 flex flex-row space-x-2">
                  <div> Don't have an account yet?</div>
                  <div className="font-medium  hover:underline text-primary-500">
                    <Link to="/signup">Sign up</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
