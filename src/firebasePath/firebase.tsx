// firebase.ts
import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  initializeFirestore,
  query,
  where,
} from "firebase/firestore";

import { getAuth } from "firebase/auth";
import type { Categories, Tools } from "../types";
type Props = {};
//Hola
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSASING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Inicializa la app de Firebase
const app = initializeApp(firebaseConfig);
// Inicializa Firestore con long polling forzado
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export const auth = getAuth();
export const { currentUser } = auth;

export const checkAdminStatus = async (): Promise<boolean> => {
  if (!currentUser) throw new Error("Usuario no ha iniciado sesion.");
  try {
    const userRef = doc(db, "users", currentUser.uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.isAdmin === true;
    }
    return false;
  } catch (error) {
    console.error("Error verificando admin:", error);
    return false;
  }
};
// ahp
// const showTools = (cat : Categories) => {
// hacer codigo necesario para el hub de tools (crear router etc...)
// }

export const fetchCategories = async (
  setCategories: React.Dispatch<React.SetStateAction<Categories[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const categoriesRef = collection(db, "categories");
    const categoriesQuery = query(categoriesRef, where("approved", "==", true));
    const querySnapshot = await getDocs(categoriesQuery);
    const categoriesData: Categories[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Categories[];
    setCategories(categoriesData);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching categories:", error);
    setLoading(true);
  }
};
export const fetchTools = async (
  setTools: React.Dispatch<React.SetStateAction<Tools[]>>
) => {
  try {
    const toolsRef = collection(db, "tools");
    const toolsQuery = query(toolsRef, where("approved", "==", true));
    const querySnapshot = await getDocs(toolsQuery);
    const toolsData: Tools[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Tools[];
    setTools(toolsData);
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};
const firebase = ({}: Props) => {
  return;
};

export default firebase;
