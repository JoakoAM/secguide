import { Drawer, Button, Portal, CloseButton, Dialog } from "@chakra-ui/react";
import { type FormEvent } from "react";
import useUser from "../hooks/useUser";

type Props = {};

export default function DrawerLogin({}: Props) {
  const { handleLogin, logged, handleLogOut } = useUser();
  if (!logged) {
    return (
      <>
        <Dialog.Root
          closeOnInteractOutside={false}
          placement={{ sm: "bottom", md: "center" }}
        >
          <Dialog.Trigger asChild>
            <Button
              variant={"plain"}
              borderRadius={"10px"}
              _hover={{
                bg: "rgba(255, 255, 255, 0.2)",
              }}
            >
              🔐 Iniciar Sesión
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
                  <Dialog.Title>Iniciar Sesion</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body pb="4">
                  <div className="container">
                    <form
                      onSubmit={(e: FormEvent) => {
                        handleLogin(e);
                      }}
                    >
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                          name="email"
                          type="email"
                          className="form-control"
                        ></input>
                        <div className="form-text" id="emailHelp">
                          Nunca compartiremos tus datos con terceros :D
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input
                          name="password"
                          type="password"
                          className="form-control"
                        ></input>
                        <div className="form-text" id="emailHelp"></div>
                      </div>
                      <button type="submit" className="btn btn-primary">
                        ingresar
                      </button>
                    </form>
                  </div>
                </Dialog.Body>
                <Dialog.CloseTrigger>
                  <CloseButton
                    _hover={{ bg: "rgba(255, 255, 255, 0.2)" }}
                    borderRadius={"10px"}
                  />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </>
    );
  }
  return (
    <Button
      bg={"transparent"}
      color={"black"}
      onClick={() => {
        handleLogOut(false);
      }}
    >
      🚪 Cerrar Sesion
    </Button>
  );
}
