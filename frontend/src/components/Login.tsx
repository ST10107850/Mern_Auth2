import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Loader } from "./Loader";
import { setCredentials } from "../slices/authSlice";
import { useLoginMutation } from "../slices/usersApiSlice";
import { RootState } from "../types/State";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null); // To hold the error message
  const [isLoading, setIsLoading] = useState<boolean>(false); // State to control spinner
//  const [loadingTimeout, setLoadingTimeout] = useState<NodeJS.Timeout | null>(
//     null
//   ); // To manage the  timeout

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useLoginMutation(); // Login mutation hook

  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/product"); // Redirect if userInfo is available
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true); // Start loading spinner

    

    try {
      setError(null); // Reset error before submitting

      // Pass email and password to the login mutation
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Logged in successfully!");
      navigate("/product"); // Navigate to the home page after successful login
    } catch (err: any) {
      // Handle error by setting the error state
      toast.error(err?.data?.message || err.error || "An error occurred");
    } finally {
      // Cleanup and stop loading spinner after 3 seconds
    
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#FCF7F2] py-8 px-10 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-orange-400 uppercase text-3xl font-bold text-center mb-6">
          Login Form
        </h1>

        <form onSubmit={submitHandler}>
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

          {/* Show error message if there's an error */}
          {error && (
            <div className="mt-4 text-red-500 text-sm font-semibold">
              {error}
            </div>
          )}

          {/* Show the loader spinner for 3 seconds */}
          {isLoading && <Loader loading={true} />}

          <div className="mt-5">
            <button
              type="submit" // Ensure button uses type="submit" for form submission
              className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-600"
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-orange-500 font-semibold">
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};
