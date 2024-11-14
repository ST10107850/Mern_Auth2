import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { RootState } from "../types/State";
import { setCredentials } from "../slices/authSlice";

export const Profile = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");

  const dispatch = useDispatch();
  const [updateUser] = useUpdateUserMutation();

  // Access user info from Redux store
  const { userInfo } = useSelector((state: RootState) => state.auth);

  // Populate form fields with userInfo if it exists
  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name || "");
      setSurname(userInfo.surname || "");
      setEmail(userInfo.email || "");
    }
  }, [userInfo]);

  // Log userInfo to check if it's updated after setting credentials
  useEffect(() => {
    console.log("Updated userInfo:", userInfo);
  }, [userInfo]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== conPassword) {
      toast.error("Passwords do not match");
    } else {
      if (userInfo) {  // Ensure userInfo is not null before submitting
        try {
          // Call the API to update the user, and unwrap the response
          const updatedUser = await updateUser({
            _id: userInfo._id,
            name,
            surname,
            email,
            password,
          }).unwrap();

          // Access the data object directly from the response to get updated user info
          dispatch(setCredentials(updatedUser.data));

          // Success message
          toast.success("Profile updated successfully!");
        } catch (err: any) {
          toast.error(err?.data?.message || err.error || "An error occurred");
        }
      } else {
        toast.error("User information is missing. Please log in again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#FCF7F2] py-8 px-10 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-orange-400 uppercase text-3xl font-bold text-center mb-6">
          Update Profile
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
              type="submit"
              className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
