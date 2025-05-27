import Logo from "../Logo";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { failure, loading, delay } from "../utils";

export default function Signup() {
  let [email, setEmail] = useState("");
  let [password, setPass] = useState("");
  let [cpassword, setPassc] = useState("");
  let [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    if (password != cpassword) {
      failure("Passwords do not match!");
      setLoading(false);
      return true;
    }
    await delay(1500);
    axios
      .post("/api/auth/signup", {
        email,
        password,
      })
      .then((res) => {
        localStorage.clear();
        localStorage.setItem("access_token", res.data.accessToken);
        navigate("/profile");
      })
      .catch((error) => {
        failure("Email already exists!");
        setLoading(false);
        console.error(error);
      });
    setLoading(false);
    return true;
  }

  return (
    <>
      <ToastContainer />
      <section className=" bg-gray-900 min-h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Logo />
          <div className="w-full  rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium  text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onInput={(event) => setEmail(event.target.value)}
                    className=" border  text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="name@company.com"
                    required={true}
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
                    value={password}
                    onInput={(event) => setPass(event.target.value)}
                    minLength="8"
                    placeholder="••••••••"
                    className="borde text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    required={true}
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium  text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    minLength="8"
                    placeholder="••••••••"
                    className=" border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    required={true}
                    value={cpassword}
                    onInput={(event) => setPassc(event.target.value)}
                  />
                </div>
                <br />
                <button
                  type="submit"
                  className="w-full text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                >
                  {loading(isLoading, <span>Create an account</span>)}
                </button>
                <div className="text-sm font-light  text-gray-400 flex flex-row space-x-2">
                  <div>Already have an account?</div>
                  <div className="font-medium  hover:underline text-primary-500">
                    <Link to="/login">Login here</Link>
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
