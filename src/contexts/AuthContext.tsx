import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  type User,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState, type ReactNode } from "react";
import { auth, db } from "../firebasePath/firebase";
import type { UserFormContext } from "../types";
import useOpen from "./OpenContext";

type Props = {
  children: ReactNode;
};

const AuthContext = React.createContext<UserFormContext>({} as UserFormContext);

export default function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: Props) {
  const { setFromEmpty } = useOpen();
  const [loginState, setLoginState] = useState({
    isLoading: true,
    success: "",
    error: "",
  });
  const [registerState, setRegisterState] = useState({
    isLoading: true,
    success: "",
    error: "",
  });

  useEffect(() => {
    let timeout;
    timeout = setTimeout(() => {
      setLoginState((s) => ({ ...s, success: "" }));
    }, 4000);
  }, [loginState.success]);

  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const adminFlag = data.isAdmin ?? false;
          setIsAdmin(adminFlag);
        } else {
          setIsAdmin(false);
        }
      } else {
        setCurrentUser(null);
        setIsAdmin(false);
      }
      setIsLoadingAuth(false);
    });
    return unsubscribe;
  }, [currentUser]);

  const handleLogin = async (email: string, password: string) => {
    setLoginState((s) => ({ ...s, isLoading: true }));
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoginState((s) => ({
        ...s,
        success: "Bienvenido :D",
      }));
      setFromEmpty(false);
    } catch (e) {
      setLoginState((s) => ({ ...s, error: (e as Error).message }));
    } finally {
      setLoginState((s) => ({ ...s, isLoading: false }));
    }
  };
  const handleRegister = async (
    email: string,
    password: string,
    name: string
  ) => {};

  return (
    <AuthContext.Provider
      value={{
        handleRegister,
        handleLogin,
        currentUser,
        isAdmin,
        registerState,
        loginState,
        isLoadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
