import { Route, Routes, useLocation } from "react-router-dom";
import {
  Home,
  Login,
  Organizations,
  Projects,
  Register,
} from "./Components/Screens";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./Contexts/AuthProvider";
import ProtectedRoutes from "./Layouts/ProtectedRoutes";
import { Admin } from "./Components/Screens/Admin";

const App = () => {
  const location = useLocation();
  return (
    <>
      <Toaster />
      <AuthProvider>
        <AnimatePresence mode="wait">
          <Routes key={location.pathname} location={location}>
            <Route index element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/organizations" element={<Organizations />} />
              <Route
                path="/organizations/:id/projects"
                element={<Projects />}
              />
            <Route path="/admin" element={<Admin/>}/>
            </Route>
          </Routes>
        </AnimatePresence>
      </AuthProvider>
    </>
  );
};

export default App;
