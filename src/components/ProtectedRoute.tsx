import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "@/context/AuthProvider";

const ProtectedRoute = () => {
  const authContext = useContext(AuthContext);
  const authenticateUser = authContext?.authenticateUser;
  const isAuthenticated = authContext?.isAuthenticated;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleAuthentication = async () => {
      if (authenticateUser) {
        await authenticateUser();
      }
      setLoading(false);
    };
    handleAuthentication();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
