import Login from "./auth/Login.jsx";
import Home from "./Home.jsx";
import Signup from "./auth/Signup.jsx";
import Diet from "./flow/Diet.jsx";
import Cuisine from "./flow/Cuisine.jsx";
import More from "./flow/More.jsx";
import Ingredients from "./flow/Ingredients.jsx";
import Recipes from "./flow/Recipes.jsx";
import Profile from "./auth/profile.jsx";
import About from "./About.jsx";
import Contact from "./Contact.jsx";

import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  function entryPoint() {
    if (localStorage.getItem("access_token") != null) {
      if (localStorage.getItem("name") == null) {
        navigate("/profile");
      } else {
        navigate("/diet");
        navigate(0);
      }
    } else {
      navigate("/login");
    }
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              onClick={() => {
                entryPoint();
              }}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/diet" element={<Diet />} />
        <Route path="/cuisine" element={<Cuisine />} />
        <Route path="/more" element={<More />} />
        <Route path="/ingredients" element={<Ingredients />} />
        <Route path="/recipes" element={<Recipes />} />
      </Routes>
    </>
  );
}

export default App;
