import { Center, Grid, GridItem } from "@chakra-ui/react";
import CategoriesView from "../../components/CategoriesView";
import DrawerPanel from "../../components/DrawerPanel";
import DrawerLogin from "../../components/DrawerLogin";
import type { FormEvent } from "react";
import DrawerRegister from "../../components/DrawerRegister";
import DrawerPanelAdmin from "../../components/DrawerPanelAdmin";

type Props = {
  handleLogin: (e: FormEvent) => void;
  handleRegister: (e: FormEvent) => void;
  success: boolean;
  error: boolean;
  isAdmin: boolean;
};

const Hub = ({
  handleLogin,
  handleRegister,
  error,
  success,
  isAdmin,
}: Props) => {
  return (
    <>
      <Grid
        font={"caption"}
        bg="gray.100"
        templateAreas={`"header header" "main main"`}
        templateRows="120px 1fr"
        templateColumns={"repeat(auto-fit, minmax(280px, 1fr))"}
      >
        <GridItem
          boxShadow={"0 10px 30px rgba(0, 0, 0, 0.2)"}
          color={"gray.200"}
          bg={"gray.400"}
          alignItems={"center"}
          pl={2}
          area={"header"}
          position={"sticky"}
          top="0px"
          zIndex={1}
        >
          <h1>🔐 Cybersecurity Tools Hub - SecGuide</h1>
          <p>Explora las mejores herramientas y aprende cómo funcionan</p>
          <div className="nav-buttons">
            <button
              id="backButton"
              className="nav-button"
              onClick={() => {
                "goBack()";
              }}
            >
              ← Volver
            </button>
            <button
              id="homeButton"
              className="nav-button"
              onClick={() => {
                "goHome()";
              }}
            >
              🏠 Inicio
            </button>
            <button
              id="logoutButton"
              className="nav-button"
              onClick={() => {
                "logOut";
              }}
            >
              🚪 Cerrar Sesión
            </button>
            <DrawerPanel></DrawerPanel>
            <DrawerPanelAdmin isAdmin={isAdmin}></DrawerPanelAdmin>
            <DrawerLogin onSubmit={handleLogin}></DrawerLogin>
            <DrawerRegister
              error={error}
              success={success}
              onSubmit={handleRegister}
            ></DrawerRegister>
          </div>
        </GridItem>
        <GridItem
          bg={"linear-gradient(135deg, #667eea 0%, #764ba2 100%)"}
          area={"main"}
        >
          <CategoriesView></CategoriesView>
        </GridItem>
      </Grid>
    </>
  );
};

export default Hub;
