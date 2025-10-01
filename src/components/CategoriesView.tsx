// import * as dotenv from "dotenv";

type Props = {};
// dotenv.config();
// const a = process.env.REACT_APP_API_KEY;
// console.log(a);

const CategoriesView = ({}: Props) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  console.log(apiKey)
  return (
    <>
      <div id="categoriesView" className="categories-grid">
        <div className="loading">Cargando categorías...</div>
      </div>
      <div id="toolsView" className="tools-grid"></div>
      <div id="toolDetailView"></div>
    </>
  );
};
export default CategoriesView;
