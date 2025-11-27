import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  type User,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState, type ReactNode } from "react";
import { auth, db } from "../firebasePath/firebase";
import type { UserFormContext } from "../types";

type Props = {
  children: ReactNode;
};

const AuthContext = React.createContext<UserFormContext>({} as UserFormContext);

export default function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: Props) {
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user != null) {
        setCurrentUser(user);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const adminFlag = data.isAdmin ?? false;
          console.log(adminFlag);
          setIsAdmin(adminFlag);
        } else {
          setIsAdmin(false);
        }
      } else {
        setCurrentUser(null);
        setIsAdmin(false);
      }
      setIsLoading(false);
    });
    return unsubscribe;
  }, [currentUser]);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess("Bienvenido.");
    } catch (e) {
      setError((e as Error).message);
      console.error(error);
    } finally {
      setIsLoading(false);
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
        success,
        error,
        currentUser,
        isAdmin,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
