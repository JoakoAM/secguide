import {
  Button,
  Center,
  CloseButton,
  Dialog,
  Portal,
  Spinner,
} from "@chakra-ui/react";
import { auth, currentUser } from "../firebasePath/firebase";
import { useNavigate } from "react-router";
import { useEffect, useState, type FormEvent } from "react";

type Props = {};

const LogOut = ({}: Props) => {
  const [open, setOpen] = useState(false);

  const logOut = () => {
    let timeout;
    timeout = setTimeout(() => {
      auth.signOut();
      nav("/");
    }, 3000);
  };
  const nav = useNavigate();
  return (
    <Dialog.Root
      closeOnInteractOutside={false}
      placement={{ sm: "bottom", md: "center" }}
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <Dialog.Trigger asChild>
        <Button
          animation="fade-in 0.5s ease-out"
          onClick={() => {
            logOut();
          }}
          variant={"plain"}
          borderRadius={"10px"}
          _hover={{
            bg: "rgba(255, 255, 255, 0.2)",
          }}
        >
          🚪 Cerrar Sesion
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            bg={"rgba(255, 255, 255, 0.2)"}
            backdropFilter={"blur(10px)"}
            border={"1px solid rgba(255, 255, 255, 0.3)"}
            alignItems={"center"}
          >
            <Dialog.Header alignSelf={"center"}>
              <Dialog.Title animation="fade-in 0.5s ease-out">
                Cerrando sesión
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="4">
              <Center>
                <Spinner size={"xl"} />
              </Center>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
export default LogOut;
