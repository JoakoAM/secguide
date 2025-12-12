import { Button, Center, Dialog, Portal, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "../firebasePath/firebase";
import stylesDialog from "../styles/Dialog.module.css";

type Props = {};

const LogOut = ({}: Props) => {
  const [open, setOpen] = useState(false);

  const logOut = () => {
    setTimeout(() => {
      auth.signOut();
      nav("/secguide");
      setOpen(false);
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
          variant={"plain"}
          className={stylesDialog.btnTrigger}
          onClick={() => {
            logOut();
          }}
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
