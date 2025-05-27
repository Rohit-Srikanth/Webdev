import Logo from "./Logo";

export default function Contact() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="flex flex-col items-center justify-top mx-auto md:h-screen lg:py-0">
        <div className="pt-4">
          <Logo />
        </div>
        <hr class="w-screen bg-gray-400 border-0.5" />
        <div className="flex flex-col items-left pt-6 space-y-2">
          <div className="text-white text-3xl font-bold">Made By</div>
          <div className="text-slate-300 text-clip text-xl font-light ">
            This website was created by Rohit Srikanth, Ritesh Minchinal, Rishab
            Thotapally. It was developed using the MERN stack for our Final
            WebTech Project.
          </div>
          <ul className="text-blue-400 list-disc pl-5 cursor-pointer">
            <li>
              <a href="#">Github</a>
            </li>
            <li>
              <a href="#">LinkedIn</a>
            </li>
            <li>
              <a href="#">Instagram</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
