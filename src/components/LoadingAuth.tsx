import { Dialog, Portal, Spinner } from "@chakra-ui/react";
import stylesDialog from "../styles/Dialog.module.css";
type Props = {
  handleOpen: boolean;
};

function LoadingAuth({ handleOpen }: Props) {
  return (
    <Dialog.Root
      placement={"center"}
      closeOnInteractOutside={false}
      lazyMount
      open={handleOpen}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content className={stylesDialog.content}>
            <Dialog.Header>
              <Dialog.Title>Cargando sesión</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Spinner w="70px" h="70px" />
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default LoadingAuth;
