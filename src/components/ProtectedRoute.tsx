import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "@/context/AuthProvider";

const ProtectedRoute = () => {
  const authContext = useContext(AuthContext);
  const authenticateUser = authContext?.authenticateUser;
  const isAuthenticated = authContext?.isAuthenticated;

  useEffect(() => {
    const handleAuthentication = async () => {
      if (authenticateUser) {
        await authenticateUser();
      }
    };
    handleAuthentication();
  }, [authenticateUser]);

  // useEffect(() => {
  //   console.log("isAuthenticated:", isAuthenticated);
  // }, [isAuthenticated]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
