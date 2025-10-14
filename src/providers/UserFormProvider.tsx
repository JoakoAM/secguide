import { useState, type FormEvent, type ReactNode } from "react";
import { login, register } from "../components/firebase";
import UserContext from "../contexts/UserContext";
type Props = {
  children: ReactNode;
};

function UserFormProvider({ children }: Props) {
  const [isAdmin, setAdmin] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [logged, setLogged] = useState<boolean>(false);
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password } = e.target as HTMLFormElement;
    const isAdmin = await login({
      email: email.value,
      password: password.value,
    });
    isAdmin ? setAdmin(isAdmin) : setAdmin(false);
    setLogged(true);
  };
  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password, firstName } = e.target as HTMLFormElement;
    const success = await register({
      name: firstName.value,
      password: password.value,
      email: email.value,
    });
    success ? setSuccess(success) : setError(success);
    const isAdmin = await login({
      email: email.value,
      password: password.value,
    });
    isAdmin ? setAdmin(isAdmin) : setAdmin(false);
    setLogged(true);
  };
  const handleLogOut = (a: boolean) => {
    setLogged(a);
    setAdmin(a);
  };

  return (
    <UserContext.Provider
      value={{
        logged,
        success,
        error,
        isAdmin,
        handleRegister,
        handleLogin,
        handleLogOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserFormProvider;
