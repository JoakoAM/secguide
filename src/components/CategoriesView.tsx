// import * as dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  where,
  query,
  getDocs,
  initializeFirestore,
} from "firebase/firestore";
// import { getStorage } from "firebase/storage";
type Props = {};
// dotenv.config();
// const a = process.env.REACT_APP_API_KEY;
// console.log(a);
import { useEffect, useState } from "react";
const firebaseConfig = {
  apiKey: "AIzaSyDYnkB7glh2xov8IkjELUWiBqXgFQ7oWew",
  authDomain: "secguide-10.firebaseapp.com",
  projectId: "secguide-10",
  storageBucket: "secguide-10.firebasestorage.app",
  messagingSenderId: "967304372442",
  appId: "1:967304372442:web:fab0d2a808d31be52ac5efirebase3",
  measurementId: "G-F14GC9TF82",
};

const app = initializeApp(firebaseConfig);

// Inicializa Firestore con long polling forzado
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  // Opcional:
  // experimentalAutoDetectLongPolling: true,
  // useFetchStreams: false
});

const CategoriesView = ({}: Props) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchCategories = async () => {
    try {
      const categoriesRef = collection(db, "categories");
      const categoriesQuery = query(
        categoriesRef,
        where("approved", "==", true)
      );
      const querySnapshot = await getDocs(categoriesQuery);

      const categoriesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(categoriesData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <div id="categoriesView" className="categories-grid">
        <div className="loading">Cargando categorías...</div>
      </div>
      <button
        onClick={() => {
          fetchCategories();
        }}
      ></button>
      <div id="toolsView" className="tools-grid"></div>
      <div id="toolDetailView"></div>
    </>
  );
};
export default CategoriesView;
