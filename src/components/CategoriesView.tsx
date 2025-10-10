type Props = {};
import { useState } from "react";
import {
  type Categories,
  type Tools,
  fetchCategories,
  fetchTools,
  renderCategories,
} from "./firebase.tsx";
import { Stack } from "@chakra-ui/react";

const CategoriesView = ({}: Props) => {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [tools, setTools] = useState<Tools[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPublicData = () => {
    fetchTools(setTools);
    fetchCategories(setCategories, setLoading);
  };
  return (
    <>
      {loadPublicData()}
      <Stack gap="2" direction="row" wrap="wrap">
        <button style={{ width: "300px", height: "200px" }} onClick={() => {}}>
          {" "}
          Hola
        </button>
        {loading ? (
          <div key="loading" className="loading">
            Cargando categorías...
          </div>
        ) : (
          <>{renderCategories(categories, tools)}</>
        )}
        <div id="toolsView" className="tools-grid"></div>
        <div id="toolDetailView"></div>
      </Stack>
    </>
  );
};
export default CategoriesView;
