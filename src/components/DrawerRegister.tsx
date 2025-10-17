import {
  Button,
  Portal,
  CloseButton,
  Dialog,
  DialogCloseTrigger,
} from "@chakra-ui/react";
import type { FormEvent } from "react";
import useUser from "../hooks/useUser";

type Props = {};

export default function DrawerLogin({}: Props) {
  const {  error, success } = useUser();
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
            📝 Crear Cuenta
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
                <Dialog.Title>Crear Cuenta</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body pb="4">
                <div className="container">
                  <form
                    onSubmit={(e: FormEvent) => {
                      e.preventDefault();
                      // handleRegister(e);
                    }}
                  >
                    <div className="mb-3">
                      <label className="form-label">Nombre</label>
                      <input
                        name="firstName"
                        type="text"
                        className="form-control"
                      ></input>
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
                    <div className="mb-3">
                      <label className="form-label">Correos</label>
                      <input
                        name="email"
                        type="text"
                        className="form-control"
                      ></input>
                      <div className="form-text" id="emailHelp"></div>
                    </div>
                    {success ? (
                      <>
                        <span>{`Registrado con exito :D`}</span>
                      </>
                    ) : (
                      ""
                    )}
                    {error ? (
                      <>
                        <span>{"Ha ocurrido un error :("}</span>
                      </>
                    ) : (
                      ""
                    )}
                    <button type="submit" className="btn btn-primary">
                      ingresar
                    </button>
                  </form>
                </div>
              </Dialog.Body>
              <DialogCloseTrigger>
                <CloseButton
                  _hover={{ bg: "rgba(255, 255, 255, 0.2)" }}
                  borderRadius={"20"}
                />
              </DialogCloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
}
