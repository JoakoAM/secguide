import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";
import { auth } from "../../firebasePath/firebase";
import useUser from "../../hooks/useUser";
import type { UserForm } from "../../types";

type Props = {};

export default function DialogLogin({}: Props) {
  const [open, setOpen] = useState(false);
  const { handleLogin } = useUser();
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
              <Dialog.Title>Iniciar sesión</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="4">
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
                    <button type="submit" className={`btn btn-primary`}>
                      ingresar
                    </button>
                  </div>
                </form>
              </div>
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton
                _hover={{ bg: "rgba(255, 255, 255, 0.2)" }}
                borderRadius={"10px"}
              />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
