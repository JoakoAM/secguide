import { type ReactNode } from "react";
import { Navigate } from "react-router";
import useAuth from "../../contexts/AuthContext";

type Props = {
  children: ReactNode;
};

const AdminRoute = ({ children }: Props) => {
  const { currentUser, isAdmin, isLoadingAuth } = useAuth();

  if (isLoadingAuth) return "Que haces aqui -.-";

  if (!currentUser) return <Navigate to="/secguide" />;

  if (isAdmin === false) return <Navigate to="/userpanel" />;

  return children;
};
export default AdminRoute;
