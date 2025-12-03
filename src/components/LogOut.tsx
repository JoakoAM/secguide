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
import stylesDialog from "../styles/Dialog.module.css";

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
          className={stylesDialog.btnTrigger}
          onClick={() => {
            logOut();
          }}
          variant={"plain"}
        >
          🚪 Cerrar Sesion
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content className={stylesDialog.content}>
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
