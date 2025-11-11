import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState, type ReactNode } from "react";
import UserContext from "../contexts/UserContext";
import { auth, currentUser, db } from "../firebasePath/firebase";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

function UserFormProvider({ children }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [admin, setIsAdmin] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>();
  const [error, setError] = useState<string>();
  const handleLogin = async (email: string, password: string) => {
    async function hook() {
      setLoading(true);
      try {
        await signInWithEmailAndPassword(auth, email, password);
        if (auth.currentUser) {
          const userRef = doc(db, "users", auth.currentUser.uid);
          const userDoc = await getDoc(userRef);
          const user = userDoc.get("name");
          const isAdmin = userDoc.get("isAdmin");
          setSuccess("Hola " + user + "!!");
          setIsAdmin(isAdmin);
        }
      } catch (e) {
        setError("Correo/Contraseña invalido(s)");
      } finally {
        setLoading(false);
      }
    }
    hook();
  };
  const handleRegister = async (
    email: string,
    password: string,
    name: string
  ) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      if (!currentUser?.uid) {
        throw new Error("No se pudo crear usuario.");
      }
      await setDoc(doc(db, "users", currentUser?.uid), {
        name: name,
        email: email,
        createdAt: serverTimestamp(),
      });
      // setSuccess("Bienvenido");
    } catch (e) {
      setError("Error al registrarse:(");
    } finally {
      setLoading(false);
    }
  };

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
