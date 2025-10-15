import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { auth, login, register } from "../firebase/firebase";
import UserContext from "../contexts/UserContext";
type Props = {
  children: ReactNode;
};

function UserFormProvider({ children }: Props) {
  const fetchUserData = async () => {
    await auth.onAuthStateChanged(async (user) => {
      console.log(user);
    });
  };
  useEffect(() => {
    fetchUserData;
  }, []);
  const [isAdmin, setAdmin] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [logged, setLogged] = useState<boolean>(false);
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password } = e.target as HTMLFormElement;
    await login(email.value, password.value);
  };
  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password, firstName } = e.target as HTMLFormElement;
    await register(email.value, password.value, firstName.value, setError);
  };

  const handleLogOut = async () => {
    await auth.signOut;
    location.reload();
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
