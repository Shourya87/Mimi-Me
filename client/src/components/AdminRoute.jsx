import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function AdminRoute() {
  const {
    user,
    isAuthenticated,
    authInitialized,
  } = useAuthStore();

  // Wait until authentication has been checked
  if (!authInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-500">
          Loading...
        </p>
      </div>
    );
  }

  // User is not logged in
  if (!isAuthenticated || !user) {
    return <Navigate to="/not-found" replace />;
  }

  // User is logged in but is not an admin
  if (user.role !== "admin") {
    return <Navigate to="/not-found" replace />;
  }

  // Admin
  return <Outlet />;
}