import { Button } from "@chakra-ui/react";
import { auth } from "../firebasePath/firebase";

type Props = {};

const LogOut = ({}: Props) => {
  return (
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
  );
};
export default LogOut;
