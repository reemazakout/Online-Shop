import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../Context/User.context";
import toast from "react-hot-toast";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(UserContext);

  if (token) {
    return children;
  } else {
    toast.error("Please Login First");
    return <Navigate to="/auth/login" />;
  }
}
