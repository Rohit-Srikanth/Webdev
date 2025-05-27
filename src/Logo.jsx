import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <>
      <div
        href="#"
        className="flex items-center mb-6 text-2xl font-semibold text-white font-extra"
      >
        <img className="w-8 h-8 mr-2" src="/logo.png" alt="logo" />
        <Link to="/"> Meal Odyssey</Link>
      </div>
    </>
  );
}
