import { Button } from "@chakra-ui/react";
import NavHub from "../../components/NavHub";
import { auth } from "../../firebasePath/firebase";
import DrawerPanel from "./DrawerPanel";
import { Navigate, useNavigate } from "react-router-dom";

type Props = {};

function HubUser({}: Props) {
  const nav = useNavigate();
  return (
    <>
      <NavHub>
        <Button
          onClick={() => {
            auth.signOut();
            nav("/");
          }}
          variant={"plain"}
          borderRadius={"10px"}
          _hover={{
            bg: "rgba(255, 255, 255, 0.2)",
          }}
        >
          🚪 Cerrar Sesion
        </Button>
        <DrawerPanel></DrawerPanel>
      </NavHub>
    </>
  );
}

export default HubUser;
