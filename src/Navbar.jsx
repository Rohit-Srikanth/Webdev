import { useEffect } from "react";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  function signOut() {
    localStorage.clear();
    navigate("/");
  }
  return (
    <>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2   p-4 rounded ">
        <Logo />
      </div>
      <div className="flex flex-row justify-between px-10 py-3  ">
        <div
          className="flex flex-row items-center space-x-2"
          id="dropdownDividerButton"
          data-dropdown-toggle="dropdownDivider"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="white"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          <div className="text-white font-semibold ">
            Hi, {localStorage.getItem("name")}
          </div>
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
          <div
            id="dropdownDivider"
            className="z-10 hidden  divide-y  rounded-lg shadow w-44 bg-gray-700 divide-gray-600"
          >
            <div
              href="#"
              onClick={() => navigate("/profile#edit")}
              className="block px-4  hover:bg-gray-600 py-3 text-sm rounded-sm   text-gray-200 "
            >
              Edit Profile
            </div>

            <div
              href="#"
              className="block px-4 py-3 text-sm hover:bg-gray-600 rounded-sm  text-amber-600	 "
              onClick={signOut}
            >
              Log out
            </div>
          </div>
        </div>
        <div
          data-tooltip-target="tooltip-bottom"
          data-tooltip-placement="bottom"
          className=" w-32 justify-center"
        >
          <div className="flex items-center justify-center mb-2">
            <div className="text-white pr-2">BMI</div>
            <div className="text-white font-extrabold">
              {localStorage.getItem("bmi")}
            </div>
          </div>
          <div className="w-full  rounded-full h-2.5 bg-gray-600">
            <div
              className={localStorage.getItem("bmicol") + " h-2.5 rounded-full"}
              style={{ width: localStorage.getItem("bmilvl") + "%" }}
            ></div>
          </div>
          <div
            id="tooltip-bottom"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium  text-white rounded-lg shadow-sm opacity-0 tooltip bg-gray-700"
          >
            <ul className="list-none space-y-4">
              <li className="flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full inline-block mr-4"></span>
                Underweight {"<18.5"}
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full inline-block mr-4"></span>
                Normal {"<25"}
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-yellow-500 rounded-full inline-block mr-4"></span>
                Overweight {"<30"}
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full inline-block mr-4"></span>
                Obsese {">30"}
              </li>
            </ul>
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}
