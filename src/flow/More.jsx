import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../Navbar";
import { checkAuth } from "../utils";

export default function More() {
  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    checkAuth(navigate);
    if (!state) {
      navigate("/diet");
      navigate(0);
    }
  }, []);

  const [info, setInfo] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/ingredients", {
      state: { ...state, more: info },
    });
    navigate(0);
  }

  return (
    <>
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
            <div className="text-lg font-extralight">Tell us more</div>
            <div className="text-3xl ">
              Any allergies or dietary exceptions we should be aware of?
            </div>

            <form onSubmit={handleSubmit}>
              <div className="w-96 mt-10 mb-4 border  rounded-lg  bg-gray-700 border-gray-600">
                <div className="px-4 py-2 rounded-t-lg bg-gray-800">
                  <textarea
                    rows="4"
                    className="w-full px-0 text-sm  border-0 bg-gray-800 focus:ring-0 text-white placeholder-gray-400"
                    placeholder="Write it here (optional) ..."
                    required={false}
                    value={info}
                    onInput={(e) => setInfo(e.target.value)}
                  ></textarea>
                </div>
                <div className="flex items-center justify-between px-3 py-2 border-t border-gray-600">
                  <button
                    type="submit"
                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4  focus:ring-blue-900 hover:bg-blue-800"
                  >
                    Submit
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
