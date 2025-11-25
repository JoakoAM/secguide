import { Grid } from "@chakra-ui/react/grid";
import { type ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../../firebasePath/firebase";

type Props = {
  children?: ReactNode;
};

const UserPanel = ({ children }: Props) => {
  return (
    <>
      <Grid
        font={"caption"}
        bg={"linear-gradient(135deg, #667eea 0%, #764ba2 100%)"}
        templateAreas={`"header header" "main main"`}
        templateRows="160px 1fr"
        templateColumns={"repeat(auto-fit, minmax(280px, 1fr))"}
      >
        {children ?? <Outlet />}
      </Grid>
    </>
  );
};

export default UserPanel;
