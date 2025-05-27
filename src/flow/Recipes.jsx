import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../Navbar";
import { checkAuth } from "../utils";

function limit(arr) {
  return arr.filter((_, index) => index < 3);
}

const MealPlanGrid = ({ mealPlan, setRecipe }) => {
  return (
    <div className="text-center p-8">
      <h2 className="text-3xl font-bold mb-6">Meal Plan</h2>
      <div className="grid grid-cols-3 gap-6 items-stretch">
 
        <div className="flex flex-col items-center">
          <h3 className="font-medium text-lg mb-4">Breakfast</h3>
          {limit(mealPlan.breakfast).map((item, index) => (
            <div
              key={index}
              onClick={() => setRecipe(item)}
              data-modal-target="default-modal"
              data-modal-toggle="default-modal"
              className="bg-[#075985] text-white w-48 h-24 rounded-xl flex items-center justify-center shadow-lg my-4 px-2 cursor-pointer"
            >
              <span className="text-[#cbd5e1]">{item.recipeName}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center">
          <h3 className="font-medium text-lg mb-4">Lunch</h3>
          {limit(mealPlan.lunch).map((item, index) => (
            <div
              key={index}
              data-modal-target="default-modal"
              data-modal-toggle="default-modal"
              onClick={() => setRecipe(item)}
              className="bg-[#713f12] text-white w-48 h-24 rounded-xl flex items-center justify-center shadow-lg my-4 px-2 cursor-pointer"
            >
              <span className="text-[#cbd5e1]">{item.recipeName}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center">
          <h3 className="font-medium text-lg mb-4">Dinner</h3>
          {limit(mealPlan.dinner).map((item, index) => (
            <div>
              <div
                key={index}
                data-modal-target="default-modal"
                data-modal-toggle="default-modal"
                onClick={() => setRecipe(item)}
                className="bg-[#171717] text-white w-48 h-24 rounded-xl flex items-center justify-center shadow-lg my-4 px-2 cursor-pointer"
              >
                <span className="text-[#cbd5e1]">{item.recipeName}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Recipes() {
  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    checkAuth(navigate);
    if (!state) {
      navigate("/diet");
      navigate(0);
    }
  }, []);

  const [recipe, setRecipe] = useState({});

  return (
    <>
      <div className="min-w-full bg-gray-800 min-h-screen  divide-gray-600">
        <Navbar />
        <div className="flex flex-col justify-between">
          <div className="pl-5 mt-5 ">
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
            <div className="text-4xl ">
              Take a look at these recipes we handpicked for you!
            </div>
            <MealPlanGrid mealPlan={state} setRecipe={setRecipe} />
          </div>
          <div></div>
        </div>
        <div
          id="default-modal"
          tabindex="-1"
          aria-hidden="true"
          className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative  rounded-lg shadow bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
                <h3 className="text-xl font-semibold  text-white">
                  {recipe?.recipeName}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
                  data-modal-hide="default-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-4 md:p-5 space-y-3">
                <span className="text-lg font-semibold text-white">
                  Ingredients
                </span>
                <ul class="list-disc px-4 pb-2">
                  {recipe?.ingredients?.map((item, index) => (
                    <li
                      key={index}
                      className="text-base leading-relaxed text-gray-400"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="text-lg font-semibold text-white">
                  Instructions
                </div>
                <ul class="list-disc pl-4">
                  {recipe?.instructions?.map((i) => (
                    <li className="text-base leading-relaxed text-gray-400">
                      {i}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center p-4 md:p-5 border-t rounded-b border-gray-600"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
