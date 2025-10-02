import { collection, where, query, getDocs } from "firebase/firestore";
type Props = {};
import { useEffect, useState } from "react";
import { type Categories, type Tools, db } from "./firebase.tsx";

const CategoriesView = ({}: Props) => {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchCategories = async () => {
    try {
      const categoriesRef = collection(db, "categories");
      const categoriesQuery = query(
        categoriesRef,
        where("approved", "==", true)
      );
      const querySnapshot = await getDocs(categoriesQuery);

      const categoriesData: Categories[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Categories[];
      setCategories(categoriesData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  };
  const fetchTools = async () => {
    try {
      const toolsRef = collection(db, "tools");
      const toolsQuery = query(toolsRef, where("approved", "==", true));
      const querySnapshot = await getDocs(toolsQuery);

      const toolsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(toolsData);
      setLoading(false);
      // const toolsData: Tools[] = querySnapshot.docs.map((doc) => ({
      //   id: doc.id,
      //   ...doc.data(),
      // })) as Tools[];
      // setCategories(toolsData);
      // setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  };
  console.log(categories);
  // const renderCategories = (c: Categories[], t: Tools[]) => {
  //   if (c.length === 0) {
  //     <p style={{ color: "white" }}>No hay categorías disponibles</p>;
  //     return;
  //   }
  //   const render = c
  //     .map((cat) => {
  //       const count = t.filter((t) => t.cats && t.cats.includes(cat.id)).length;
  //       return (
  //         <div className="category-card">
  //           <h3>{cat.name}</h3>
  //           <p>{cat.desc}</p>
  //           <p className="count">
  //             {count}herramienta{count !== 1 ? "s" : ""}
  //           </p>
  //         </div>
  //       );
  //     })
  //     .join("");
  //   return render;
  // };

  return (
    <>
      {/* <div id="categoriesView" className="categories-grid">
        {loading ? (
          <div className="loading">Cargando categorías...</div>
        ) : (
          <>{renderCategories(categories, tools)}</>
        )}
      </div> */}
      <button
        style={{ width: "300px", height: "200px" }}
        onClick={() => {
          fetchCategories();
          fetchTools();
        }}
      ></button>

      <div id="toolsView" className="tools-grid"></div>
      <div id="toolDetailView"></div>
    </>
  );
};
export default CategoriesView;
