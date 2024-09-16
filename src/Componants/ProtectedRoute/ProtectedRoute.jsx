import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../Context/User.context";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(UserContext);

  if (token) {
    // ممكن يكون اليوزر معو توكن لكن التوكن بعد فترة صار اكسبايرد
    return children;
  } else {
    return <Navigate to="/auth/login" />;
  }
}
