// firebase.ts
import { initializeApp } from "firebase/app";
import {
  initializeFirestore,
  collection,
  where,
  query,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  doc,
  // setDoc,
} from "firebase/firestore";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Card, Text } from "@chakra-ui/react";
import type { Categories, PropUserUid, Tools, UserForm } from "../types";

type Props = {};

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

const auth = getAuth();
export let currentUser: PropUserUid;
export const register = async ({ name, email, password }: UserForm) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    currentUser = { uid: userCredential.user.uid };
    await setDoc(doc(db, "users", userCredential.user.uid), {
      name: name,
      email: email,
      createdAt: serverTimestamp(),
    });
    return true;
  } catch (e) {
    console.log("error", e);
    return false;
  }
};

export const login = async ({ email, password }: UserForm) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    currentUser = { uid: userCredential.user.uid };
    const isAdmin = await checkAdminStatus();
    console.log(isAdmin);
    return isAdmin;
  } catch (error) {
    console.error("Login error:", error);
  }
};

export const checkAdminStatus = async (): Promise<boolean> => {
  if (!currentUser) return false;
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
// const showTools = (cat : Categories) => {
// hacer codigo necesario para el hub de tools (crear router etc...)
// }

export const renderCategories = (c: Categories[], t: Tools[]) => {
  if (c.length === 0) {
    //Mensaje de er
    <p style={{ color: "white" }}>No hay categorías disponibles</p>;
    return;
  }
  const render = c.map((cat) => {
    const count = t.filter((t) => t.cats && t.cats.includes(cat.id)).length;
    return (
      <Card.Root
        key={cat.id}
        boxShadow={"0 10px 30px rgba(0, 0, 0, 0.2)"}
        color={"gray.300"}
        borderRadius="10px"
        marginTop="10px"
        w="486px"
        h="200px"
        overflow="hidden"
        margin={"14px"}
        transition=".3s"
        cursor={"pointer"}
        _hover={{
          transform: "translateY(-8px)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Card.Body  gap="2">
          <Card.Title maxH={"62px"} fontWeight={"bold"} fontSize={30} color="#333">
            {cat.name}
          </Card.Title>
          <Card.Description fontWeight={"lighter"} color={"#555"}>{cat.desc}</Card.Description>
          <Card.Description fontSize={"15px"} fontWeight={"bold"} color="#667eea">
            {count} herramienta{count !== 1 ? "s" : ""}
          </Card.Description>
        </Card.Body>
      </Card.Root>
    );
  });
  return render;
};
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
