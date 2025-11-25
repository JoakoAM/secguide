import { useState, type ReactNode } from "react";
import UserContext from "../contexts/UserContext";

type Props = {
  children: ReactNode;
};

function UserFormProvider({ children }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [admin, setIsAdmin] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>();
  const [error, setError] = useState<string>();

  const handleLogin = async (email: string, password: string) => {};
  const handleRegister = async (
    email: string,
    password: string,
    name: string
  ) => {};

  return (
    <UserContext.Provider
      value={{
        handleRegister,
        handleLogin,
        loading,
        success,
        error,
        admin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserFormProvider;
