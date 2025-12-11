import {
  Button,
  CloseButton,
  Dialog,
  DialogCloseTrigger,
  Portal,
} from "@chakra-ui/react";
import useOpen from "../../contexts/OpenContext";
import stylesDialog from "../../styles/Dialog.module.css";
import RegisterForm from "./RegisterForm";

type Props = {};

export default function DialogRegister({}: Props) {
  const { setOpenLog, openReg, setOpenReg } = useOpen();

  return (
    <>
      <Dialog.Root
        closeOnInteractOutside={false}
        placement={{ sm: "bottom", md: "center" }}
        open={openReg}
        onOpenChange={(e) => setOpenReg(e.open)}
      >
        <Dialog.Trigger asChild>
          <Button
            animation="fade-in 0.5s ease-out"
            variant={"plain"}
            className={stylesDialog.btnTrigger}
          >
            📝 Crear Cuenta
          </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content
              animation={"fade-in 0.5s ease-out"}
              className={stylesDialog.content}
            >
              <Dialog.Header alignSelf={"center"}>
                <Dialog.Title>Crear Cuenta</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body pb="4">
                <RegisterForm />
                <Button
                  onClick={() => {
                    setOpenReg(false);
                    setOpenLog(true);
                  }}
                  mt={"10px"}
                  w={"auto"}
                  h="auto"
                  variant={"plain"}
                >
                  ¿Ya tienes cuenta?. Inicia sesión aquí.
                </Button>
              </Dialog.Body>
              <DialogCloseTrigger asChild>
                <CloseButton className={stylesDialog.btnClose} />
              </DialogCloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
}
