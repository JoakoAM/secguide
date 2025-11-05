import { Button } from "@chakra-ui/react";
import DrawerPanelAdmin from "./DrawerPanelAdmin";
import { auth } from "../../firebasePath/firebase";
import NavHub from "../../components/NavHub";
import { useNavigate } from "react-router";

type Props = {};

function HubAdmin({}: Props) {
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
        <DrawerPanelAdmin></DrawerPanelAdmin>
      </NavHub>
    </>
  );
}

export default HubAdmin;
