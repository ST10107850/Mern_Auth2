import { CgProfile } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import {  useSelector } from "react-redux"; // Fix the import here
import { MdArrowDropDown } from "react-icons/md";
import { useState } from "react";
import { RootState } from "../types/State";
// import { useLogoutMutation } from "../slices/usersApiSlice";
// import { logout } from "../slices/authSlice";

export const Navbar = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
// const token = useSelector((state: RootState) => state.auth.token); // if token is separate



  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const [logoutApiCall] = useLogoutMutation();

  // const logoutHandler = async () => {
  //   try {
  //     // Pass required data (e.g., userInfo or token)
  //     await logoutApiCall(token).unwrap(); // Provide necessary data

  //     // Dispatch logout action and navigate
  //     dispatch(logout());
  //     navigate("/");
  //   } catch (error: any) {
  //     console.log("Error", error.message);
  //   }
  // };

  return (
    <div className="w-full px-5 md:px-10 py-4 flex justify-between bg-[#F1E6DB] z-10">
      <NavLink
        to="/"
        className="text-xl md:text-2xl font-bold text-tertiaryColor"
      >
        <span className="inline">Edu</span>
        <span className="inline text-orange-500">Track</span>
        <span className="inline">HS</span>
      </NavLink>

      <div className="flex items-center space-x-4 md:space-x-5 font-light text-sm md:text-lg">
        {userInfo ? (
          <div className="flex items-center space-x-2 text-tertiaryColor">
            {/* Profile name with dropdown */}
            <NavLink
              to="#"
              className="pr-4 md:pr-10 flex items-center space-x-2 cursor-pointer"
              onClick={toggleDropdown} // Toggle dropdown visibility on click
            >
              <span>
                {userInfo.name} {userInfo.surname}
              </span>
              <MdArrowDropDown size={24} /> {/* Dropdown icon */}
            </NavLink>

            {/* Dropdown options */}
            {isDropdownOpen && (
              <div className="absolute bg-white shadow-lg rounded-lg mt-2 py-2 px-4">
                <NavLink
                  to="/profile"
                  className="block py-2 px-4 hover:bg-gray-100 text-sm"
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/"
                  // onClick={logoutHandler}
                  className="block py-2 px-4 hover:bg-gray-100 text-sm"
                >
                  Log Out
                </NavLink>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-2 text-tertiaryColor">
            <CgProfile size={30} />
            <NavLink to="/login" className="pr-4 md:pr-10">
              Sign In
            </NavLink>
            <NavLink to="/register">
              <span className="bg-orange-500 py-2 px-4 rounded-full text-white hover:bg-orange-200">
                Create An Account
              </span>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};
