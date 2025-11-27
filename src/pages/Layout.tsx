import { Grid, GridItem } from "@chakra-ui/react";
import { type ReactNode } from "react";
import { Outlet } from "react-router-dom";
import CategoriesView from "../components/CategoriesView";

type Props = {
  children?: ReactNode;
};

function Layout({}: Props) {
  console.log("cargando layout");
  return (
    <>
      <Grid
        font={"caption"}
        bg={"linear-gradient(135deg, #667eea 0%, #764ba2 100%)"}
        templateAreas={`"header header" "main main"`}
        templateRows="160px 1fr"
        templateColumns={"repeat(auto-fit, minmax(280px, 1fr))"}
        justifyItems={"center"}
      >
        <Outlet />
        <GridItem
          bg={"linear-gradient(135deg, #667eea 0%, #764ba2 100%)"}
          area={"main"}
        >
          <CategoriesView />
        </GridItem>
      </Grid>
    </>
  );
}

export default Layout;
