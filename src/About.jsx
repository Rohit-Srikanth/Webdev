import Logo from "./Logo";

export default function About() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="flex flex-col items-center justify-top mx-auto md:h-screen lg:py-0">
        <div className="pt-4">
          <Logo />
        </div>
        <hr class="w-screen bg-gray-400 border-0.5" />
        <div className="flex flex-col items-center pt-16 space-y-2">
          <div className="text-white text-3xl font-bold">About Us</div>
          <div className="text-slate-300 px-32 text-clip text-xl font-light text-center">
            Welcome to Meal Odyssey your ultimate culinary adventure! Our app is
            designed to take the stress out of meal planning. With a vast
            collection of recipes for all diets, preferences, and occasions, we
            generate personalized meal suggestions based on what you have in
            your pantry, your dietary goals, and your cooking skills. No more
            scrambling for ideas-your next great dish is just a few taps away.
            <br />
            <br />
            At Meal Odyssey, we believe that cooking is more than just a
            task-it's a journey. Whether you're a seasoned chef or a beginner in
            the kitchen, we want to help you explore new flavors, try exciting
            ingredients, and create meals that are as enjoyable to make as they
            are to eat.
          </div>
          <div className="text-white text-3xl font-bold pt-3">Why Meal Odyssey?</div>
          <div className="text-slate-300 px-32 py-4 text-center text-clip text-xl font-light">
            Personalized Recipes: Whether you're looking for quick weeknight
            dinners, special occasion meals, or healthy options, Meal Odyssey
            tailors recipes to your needs. Ingredient Flexibility: Have some
            ingredients in the fridge but not sure what to make? We work with
            what you've got and offer recipe suggestions using the ingredients
            you already have on hand. Easy to Follow: Recipes are simple, clear,
            and designed for cooks of all levels, with step-by-step instructions
            and tips to help you succeed every time. Endless Exploration: Like
            an odyssey, the adventure never ends. We continually update our
            recipe library, so you'll always find something new to try.
          </div>
        </div>
      </div>
    </div>
  );
}
