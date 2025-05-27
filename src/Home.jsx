import Logo from "./Logo.jsx";
import { Link } from "react-router-dom";

export default function Home({ onClick }) {
  return (
    <>
      <div className="relative h-screen w-screen bg-slate-950 min-h-screen bg-[url('/meals.png')] bg-contain bg-no-repeat bg-right bg-clip-border ">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] ">
          <div className="p-5 flex flex-row justify-left px-16 mb-10">
            <Logo />
            <div className="text-white flex flex-row space-x-4 mt-2 ml-10 ">
              <div className="hover:text-slate-400 underline decoration-dotted decoration-1">
                <Link to="/about">About Us</Link>
              </div>
              <div className="hover:text-slate-400 underline decoration-dotted decoration-1">
                <Link to="/contact">Contact Us</Link>
              </div>
              <div
                className="hover:text-slate-400 flex flex-row space-x-1 cursor-pointer"
                onClick={onClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 pr-1 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  />
                </svg>
                Login/Register
              </div>
            </div>
            {/* <button
              onClick={onClick}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-2  me-2  mb-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Get Started
            </button> */}
          </div>
          <div className="flex flex-row  justify-between">
            <div className="mt-56 text-6xl font-semibold w-1/2 text-wrap pl-10  text-white">
              Your secret weapon for eating healthy
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
