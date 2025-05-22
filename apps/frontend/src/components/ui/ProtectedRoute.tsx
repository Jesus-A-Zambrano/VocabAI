import { useUser } from "@clerk/clerk-react";
import type { ReactNode } from "react";
import { Navigate } from "react-router";

interface Props {
  children: ReactNode;
}
const ProtectedRoute = ({ children }: Props) => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <div>Cargando...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/" />;
  }

  // console.log(user.id);

  return children;
};

export default ProtectedRoute;
