import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children }) {
  if (isLoggedIn) {
    return children;
  } else {
    return <Navigate to="/sign-in" />;
  }
}

export default ProtectedRoute;
