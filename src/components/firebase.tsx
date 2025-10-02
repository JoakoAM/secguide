// firebase.ts
import { initializeApp } from "firebase/app";
import {
  initializeFirestore,
  Timestamp,
  collection,
  where,
  query,
  getDocs,
} from "firebase/firestore";

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
  // Opcional:
  // experimentalAutoDetectLongPolling: true,
  // useFetchStreams: false
});

// const showTools = (cat : Categories) => {
  // hacer codigo necesario para el hub de tools (crear router etc...)
// }

export const renderCategories = (c: Categories[], t: Tools[]) => {
  if (c.length === 0) {
    <p style={{ color: "white" }}>No hay categorías disponibles</p>;
    return;
  }
  const render = c.map((cat) => {
    const count = t.filter((t) => t.cats && t.cats.includes(cat.id)).length;
    return (
      <div key={cat.id} onClick={() => {
        // showTools(cat.id)
      }}className="category-card">
        <h3>{cat.name}</h3>
        <p>{cat.desc}</p>
        <p className="count">
          {count}herramienta{count !== 1 ? "s" : ""}
        </p>
      </div>
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
