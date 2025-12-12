import { type ReactNode } from "react";
import { Navigate } from "react-router";
import useAuth from "../../contexts/AuthContext";

type Props = {
  children: ReactNode;
};

const UserRoute = ({ children }: Props) => {
  const {
    currentUser,
    isAdmin,

    isLoadingAuth,
  } = useAuth();

  if (isLoadingAuth) return null;

  if (!currentUser) return <Navigate to="/secguide" />;

  if (isAdmin === true) return <Navigate to="/adminpanel" />;

  return children;
};
export default UserRoute;
