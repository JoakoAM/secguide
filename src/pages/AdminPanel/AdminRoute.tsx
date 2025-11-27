import { type ReactNode } from "react";
import { Navigate } from "react-router";
import useAuth from "../../contexts/AuthContext";

type Props = {
  children: ReactNode;
};

const AdminRoute = ({ children }: Props) => {
  const { currentUser, isAdmin, isLoading } = useAuth();
  if (isLoading) return null; // spinner si quieres

  if (!currentUser) return <Navigate to="/" />;

  if (isAdmin === false) return <Navigate to="/userpanel" />;

  return children;
};
export default AdminRoute;
