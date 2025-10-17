import { useEffect, useState, type ReactNode } from "react";
import { auth, currentUser, db } from "../firebasePath/firebase";
import UserContext from "../contexts/UserContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp, getDoc } from "firebase/firestore";
type Props = {
  children: ReactNode;
};

function UserFormProvider({ children }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>();
  const [error, setError] = useState<string>();
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  const handleLogin = async (email: string, password: string) => {
    async function hook() {
      setLoading(true);
      try {
        await signInWithEmailAndPassword(auth, email, password);
        if (auth.currentUser) {
          const userRef = doc(db, "users", auth.currentUser.uid);
          const userDoc = await getDoc(userRef);
          const user = userDoc.get("name");
          setSuccess("Hola " + user + "!!");
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserFormProvider;
