import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../Navbar";
import { checkAuth } from "../utils";

const diets = [
  { img: "/00.png", text: "KETO" },
  { img: "/10.png", text: "PALEO" },
  { img: "/20.png", text: "VEGETARIAN" },
  { img: "/30.png", text: "VEGAN" },
  { img: "/01.png", text: "MEDITERRANEAN" },
  { img: "/11.png", text: "RAW" },
  { img: "/21.png", text: "LOW CARB" },
  { img: "/31.png", text: "NO SUGAR" },
];

const DietGrid = ({ navigate }) => {
  return (
    <div className="grid grid-cols-4 gap-6 p-4 cursor-pointer">
      {diets.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center"
          onClick={() => (
            navigate("/cuisine", { state: { diet: item.text } }), navigate(0)
          )}
        >
          <div className="w-[110px] h-[110px] bg-white rounded-full flex items-center justify-center overflow-hidden shadow-md">
            <img
              src={item.img}
              alt={item.text}
              className="w-[100px] h-[100px] object-cover"
            />
          </div>
          <span className="mt-2 text-center text-white">{item.text}</span>
        </div>
      ))}
    </div>
  );
};

export default function Diet() {
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth(navigate);
  }, []);

  return (
    <>
      <div className="min-w-full bg-gray-800 min-h-screen  divide-gray-600">
        <Navbar />
        <div className="flex flex-col items-center justify-center text-white pb-20 pt-10">
          <div className="text-lg font-extralight">Type of Diet</div>
          <div className="text-3xl ">
            What diet would you like to follow today?
          </div>
        </div>
        <DietGrid navigate={navigate} />
      </div>
    </>
  );
}
