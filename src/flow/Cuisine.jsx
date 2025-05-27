import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../Navbar";
import { checkAuth } from "../utils";

const cuisines = [
  { text: "North Indian" },
  { text: "South Indian" },
  { text: "Italian" },
  { text: "Chinese" },
  { text: "Mexican" },
  { text: "Thai" },
];

const CuisineGrid = ({ navigate, prevState }) => {
  return (
    <div className="grid grid-cols-2 gap-6 p-8 pt-20 cursor-pointer">
      {cuisines.map((item, index) => (
        <div
          key={index}
          onClick={() => (
            navigate("/more", {
              state: { ...prevState, cuisine: item.text },
            }),
            navigate(0)
          )}
          className="flex items-center justify-center bg-primary-900 text-white font-semibold w-40 h-16 rounded-full"
        >
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  );
};

export default function Cuisine() {
  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    checkAuth(navigate);
    if (!state) {
      navigate("/diet");
      navigate(0);
    }
  }, []);

  return (
    <>
      <div className="min-w-full bg-gray-800 min-h-screen  divide-gray-600">
        <Navbar />
        <div className="flex flex-col justify-between">
          <div className="pl-5 mt-5" >
            <svg
            onClick={() => history.back()}
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
                d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
              />
            </svg>
          </div>
          <div className="flex flex-col items-center justify-center text-white  ">
            <div className="text-lg font-extralight">Type of Cuisine</div>
            <div className="text-3xl ">
              Select the Type of Cuisine You're Craving Right Now
            </div>
            <CuisineGrid navigate={navigate} prevState={state} />
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}
