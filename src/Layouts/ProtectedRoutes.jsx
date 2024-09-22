import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";


const ProtectedRoutes = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;




