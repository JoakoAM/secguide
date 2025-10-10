// firebase.ts
import { initializeApp } from "firebase/app";
import {
  initializeFirestore,
  Timestamp,
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
import { Card, Image, Text } from "@chakra-ui/react";

type Props = {};
export type Categories = {
  id: string;
  desc: string;
  name: string;
  createdAt: Timestamp;
  approved: boolean;
};

export type Tools = {
  approved: boolean;
  article: string;
  brief: string;
  cats: string[];
  createdAt: Timestamp;
  createdBy: string;
  func: string;
  id: string;
  license: string;
  link: string;
  name: string;
  platform: string;
  ratings: object;
};
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
export let currentUser: userProp | null = null;
export const register = async (
  email: string,
  password: string,
  name: string
) => {
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

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    currentUser = { uid: userCredential.user.uid };
    // const userRef = await collection(db, "users");
    // console.log(getDocs(userRef));
    const isAdmin = await checkAdminStatus();
    return isAdmin;
  } catch (error) {
    console.error("Login error:", error);
  }
};

type userProp = {
  uid: string;
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
      <>
        <Card.Root
          key={cat.id}
          boxShadow={"0px 0px 11px 4px"}
          color={"gray.300"}
          borderRadius="10px"
          marginTop="10px"
          w="486px"
          h="200px"
          overflow="hidden"
          margin={"14px"}
        >
          <Card.Body gap="2">
            <Card.Title maxH={"62px"} fontSize={30} color="blue.500">
              {cat.name}
            </Card.Title>

            <Card.Description>
              <Text color={"black"}> {cat.desc}</Text>
               {count} herramienta{count !== 1 ? "s" : ""}
            </Card.Description>
          </Card.Body>

          <Card.Footer gap="2"></Card.Footer>
        </Card.Root>
      </>
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
  return <></>;
};

export default firebase;
