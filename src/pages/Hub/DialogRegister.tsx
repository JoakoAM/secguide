import {
  Button,
  Portal,
  CloseButton,
  Dialog,
  DialogCloseTrigger,
} from "@chakra-ui/react";
import useUser from "../../hooks/useUser";
import { useForm } from "react-hook-form";

type Props = {};
type FormType = {
  firstName: string;
  password: string;
  email: string;
};
export default function DialogRegister({}: Props) {
  const { register, handleSubmit, formState: errors } = useForm<FormType>();
  const { error, success, handleRegister } = useUser();

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
                    onSubmit={handleSubmit((data) =>
                      handleRegister(data.email, data.password, data.firstName)
                    )}
                  >
                    <div className="mb-3">
                      <label className="form-label">Nombre</label>
                      <input
                        {...register("firstName")}
                        type="text"
                        className="form-control"
                      ></input>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Contraseña</label>
                      <input
                        {...register("password")}
                        type="password"
                        className="form-control"
                      ></input>
                      <div className="form-text" id="emailHelp"></div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Correo</label>
                      <input
                        {...register("email")}
                        type="text"
                        className="form-control"
                      ></input>
                      <div className="form-text" id="emailHelp"></div>
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
                    </div>
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
