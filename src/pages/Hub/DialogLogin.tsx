import {
  Button,
  Center,
  CloseButton,
  Dialog,
  Portal,
  Spinner,
} from "@chakra-ui/react";
import { useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";
import type { UserForm } from "../../types";
import useAuth from "../../contexts/AuthContext";
import stylesDialog from "../../styles/Dialog.module.css";
type Props = {};

export default function DialogLogin({}: Props) {
  const [open, setOpen] = useState(false);
  const { handleLogin, loginState, currentUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UserForm>();

  const onSubmit = handleSubmit((data: UserForm) => {
    handleLogin(data.email, data.password);
  });

  return (
    <Dialog.Root
      closeOnInteractOutside={false}
      placement={{ sm: "bottom", md: "center" }}
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <Dialog.Trigger asChild>
        <Button
          variant={"plain"}
          borderRadius={"10px"}
          _hover={{
            bg: "rgba(255, 255, 255, 0.2)",
          }}
          animation="fade-in 0.5s ease-out"
        >
          🔐 Iniciar Sesión
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content className={stylesDialog.content}>
            <Dialog.Header alignSelf={"center"}>
              <Dialog.Title
                animation="fade-in 0.5s ease-out"
                key={loginState.success ? "success" : "title"}
              >
                {loginState.success && !loginState.isLoading
                  ? loginState.success
                  : "Iniciar sesión"}
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="4">
              {(loginState.isLoading && loginState.success) || currentUser ? (
                <Center>
                  <Spinner size={"xl"} />
                </Center>
              ) : (
                <div className="container">
                  <form
                    onSubmit={(e: FormEvent) => {
                      e.preventDefault();
                      onSubmit();
                    }}
                  >
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        {...register("email", {
                          required: {
                            value: true,
                            message: "Campo requerido",
                          },
                        })}
                        className="form-control"
                      ></input>
                      {errors.email ? (
                        <span style={{ color: "red" }}>
                          {errors.email.message}
                        </span>
                      ) : (
                        ""
                      )}
                      <div className="form-text" id="emailHelp">
                        Nunca compartiremos tus datos con terceros :D
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Contraseña</label>
                      <input
                        {...register("password", {
                          required: {
                            value: true,
                            message: "Campo requerido",
                          },
                        })}
                        type="password"
                        className="form-control"
                      />
                      {errors.password ? (
                        <span>{errors.password?.message}</span>
                      ) : (
                        ""
                      )}

                      <div className="form-text" id="emailHelp"></div>
                    </div>
                    <div style={{ justifyContent: "center", display: "flex" }}>
                      <Button
                        _hover={{ scale: 1.02 }}
                        transition="0.1s ease all"
                        type="submit"
                        className={`btn btn-primary`}
                      >
                        ingresar
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton className={stylesDialog.btnClose} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
