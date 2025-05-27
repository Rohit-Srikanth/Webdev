import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, Bounce } from "react-toastify";

import Navbar from "../Navbar";
import { checkAuth, loading } from "../utils";

export default function Ingredients() {
  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    checkAuth(navigate);
    if (!state) {
      navigate("/diet");
      navigate(0);
    }
  }, []);

  const [ingredients, setIngredients] = useState("");
  const [isLoading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const infoToast = toast.loading("Generating Tasty Recipes...", {
      position: "top-left",
      theme: "light",
      transition: Bounce,
    });

    axios
      .post(
        "/api/user/generateRecipes",
        {
          ...state,
          ingredients,
        },
        {
          headers: {
            "X-access-token": localStorage.getItem("access_token"),
          },
        }
      )
      .then((res) => {
        toast.update(infoToast, {
          render: "Done!",
          type: "success",
          autoClose: 2500,
          isLoading: false,
        });
        setLoading(false);
        navigate("/recipes", { state: res.data });
        navigate(0);
      })
      .catch((err) => {
        toast.update(infoToast, {
          render: "Something went wrong",
          type: "error",
          autoClose: 2500,
          isLoading: false,
        });
        setLoading(false);
        console.error(err);
      });
  }

  return (
    <>
      <ToastContainer />
      <div className="min-w-full bg-gray-800 min-h-screen  divide-gray-600">
        <Navbar />
        <div className="flex flex-col justify-between">
          <div className="pl-5 mt-5">
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
            <div className="text-lg font-extralight">Ingredients in hand</div>
            <div className="text-3xl ">
              What ingredients do you have on hand and are ready to use?
            </div>

            <form onSubmit={handleSubmit}>
              <div className="w-96 mt-10 mb-4 border rounded-lg bg-gray-700 border-gray-600">
                <div className="px-4 py-2  rounded-t-lg bg-gray-800">
                  <textarea
                    rows="4"
                    className="w-full px-0 text-sm  border-0 bg-gray-800 focus:ring-0 text-white placeholder-gray-400"
                    placeholder="Write it here (optional)..."
                    value={ingredients}
                    onInput={(e) => setIngredients(e.target.value)}
                    required={false}
                  ></textarea>
                </div>
                <div className="flex items-center justify-between px-3 py-2 border-t border-gray-600">
                  <button
                    type="submit"
                    className="w-32 items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4  focus:ring-blue-900 hover:bg-blue-800"
                  >
                    {loading(isLoading, <span>Generate Recipes</span>)}
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}
