import { Button } from "@chakra-ui/react";
import { auth } from "../firebasePath/firebase";
import { useNavigate } from "react-router";

type Props = {};

const LogOut = ({}: Props) => {
  const nav = useNavigate();
  return (
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
  );
};
export default LogOut;
