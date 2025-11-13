import { Grid } from "@chakra-ui/react";
import { type ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useUserStatus from "../../hooks/useUserStatus";

type Props = {
  children?: ReactNode;
};

const AdminPanel = ({ children }: Props) => {
  const { isLoading, isAdmin } = useUserStatus();

  if (!isLoading) {
    if (!isAdmin || isAdmin == undefined) {
      return <Navigate to="/" />;
    }
  }
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

export default AdminPanel;
