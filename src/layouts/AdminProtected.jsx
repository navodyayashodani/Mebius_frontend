import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router";
import { Outlet } from "react-router";

function AdminProtected() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (user?.publicMetadata?.role !== "admin") {
    return <Navigate to="/" />;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  } 

  return <Outlet />;
}

export default AdminProtected;