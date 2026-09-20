import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/useStores.js";

export default function ProtectedRoute({ children }) {
    const isAuthenticated = useAuthStore((state) => Boolean(state.token));
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };