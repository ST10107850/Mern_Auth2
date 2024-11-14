import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../types/State";

export const Hero = () => {
  const authState = useSelector((state: RootState) => state.auth);

  console.log(authState);
  return (
    <div className="py-10">
      <div className="flex h-[50vh] justify-center items-center">
        <div className="bg-[#FCF7F2] px-5 py-10 flex items-center flex-col">
          <h1 className="text-orange-400 text-3xl font-bold uppercase mb-6">
            MERN Authentication
          </h1>
          <p className="text-center max-w-xl mb-6">
            This is a boilerplate for Mern Auth that stores a JWT in an
            HTTP-Only cookies. It also uses Redux Toolkit, React and Tailwind
            CSS Library
          </p>
          <div className="space-x-4 items-center flex">
            <Link
              to="/login"
              className="bg-[#FF6726] text-white px-3 py-2 rounded-md hover:bg-orange-200"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="bg-orange-400 text-white px-3 py-2 rounded-md hover:bg-orange-200"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
