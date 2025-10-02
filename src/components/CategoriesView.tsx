type Props = {};
import { useState } from "react";
import {
  type Categories,
  type Tools,
  fetchCategories,
  fetchTools,
  renderCategories,
} from "./firebase.tsx";

const CategoriesView = ({}: Props) => {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [tools, setTools] = useState<Tools[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPublicData = () => {
    fetchTools(setTools);
    fetchCategories(setCategories,setLoading);
  };
  return (
    <>
    {loadPublicData()}
      <button
        style={{ width: "300px", height: "200px" }}
        onClick={() => {}}
      ></button>
      <div id="categoriesView" className="categories-grid">
        {loading ? (
          <div key="loading" className="loading">
            Cargando categorías...
          </div>
        ) : (
          <>{renderCategories(categories, tools)}</>
        )}
      </div>
      <div id="toolsView" className="tools-grid"></div>
      <div id="toolDetailView"></div>
    </>
  );
};
export default CategoriesView;
