import { Grid } from "@chakra-ui/react";
import { type ReactNode } from "react";
import { Outlet } from "react-router-dom";

type Props = {
  children?: ReactNode;
};

function Layout({ children }: Props) {
  return (
    <div>
      <Grid
        font={"caption"}
        bg={"linear-gradient(135deg, #667eea 0%, #764ba2 100%)"}
        templateAreas={`"header header" "main main"`}
        templateRows="160px 1fr"
        templateColumns={"repeat(auto-fit, minmax(280px, 1fr))"}
      >
        {children ?? <Outlet />}
      </Grid>
    </div>
  );
}

export default Layout;
