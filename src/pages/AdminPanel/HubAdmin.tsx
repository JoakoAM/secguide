import { Button } from "@chakra-ui/react";
import NavHub from "../../components/NavHub";
import { auth } from "../../firebasePath/firebase";
import useCategories from "../../hooks/useCategories";
import DialogPanelAdmin from "./DialogPanelAdmin";

type Props = {};

function HubAdmin({}: Props) {
  return (
    <>
      <NavHub>
        <Button
          onClick={() => {
            auth.signOut();
            location.reload();
          }}
          variant={"plain"}
          borderRadius={"10px"}
          _hover={{
            bg: "rgba(255, 255, 255, 0.2)",
          }}
        >
          🚪 Cerrar Sesion
        </Button>
        <DialogPanelAdmin></DialogPanelAdmin>
      </NavHub>
    </>
  );
}

export default HubAdmin;
