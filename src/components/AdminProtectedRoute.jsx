import { Navigate } from "react-router-dom";
import { getUser, isLoggedIn } from "../utils/auth";

function AdminProtectedRoute({ children }) {
  const user = getUser();

  if (!isLoggedIn() || !user || user.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default AdminProtectedRoute;