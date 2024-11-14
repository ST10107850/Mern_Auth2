import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { RootState } from "../types/State";
import { setCredentials } from "../slices/authSlice";

export const Register = () => {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [conPassword, setConPassword] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register] = useRegisterMutation();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/product");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== conPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ name, surname, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("User registered successfully!");
        navigate("/product");
      } catch (err: any) {
        toast.error(err?.data?.message || err.error || "An error occurred");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#FCF7F2] py-8 px-10 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-orange-400 uppercase text-3xl font-bold text-center mb-6">
          Create Account
        </h1>

        <form onSubmit={submitHandler}>
          <div className="mt-5">
            <label className="block text-sm font-semibold text-gray-700">
              Enter your name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="John"
            />
          </div>

          <div className="mt-5">
            <label className="block text-sm font-semibold text-gray-700">
              Enter your surname
            </label>
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Doe"
            />
          </div>

          <div className="mt-5">
            <label className="block text-sm font-semibold text-gray-700">
              Enter your email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="youremail@example.com"
            />
          </div>

          <div className="mt-5">
            <label className="block text-sm font-semibold text-gray-700">
              Enter your password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="********"
            />
          </div>

          <div className="mt-5">
            <label className="block text-sm font-semibold text-gray-700">
              Confirm your password
            </label>
            <input
              type="password"
              value={conPassword}
              onChange={(e) => setConPassword(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="********"
            />
          </div>

          <div className="mt-5">
            <button
              type="submit" // Make sure the button is of type submit
              className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-600"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-500 font-semibold">
              Sign In
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};
