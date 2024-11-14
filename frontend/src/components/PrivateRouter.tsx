import { Navigate, Outlet } from "react-router-dom";
import { useSelector} from "react-redux";
import { RootState } from "../types/State";

export const PrivateRouter = () => {
  const { userInfo } = useSelector((state:RootState) => state.auth);

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};
