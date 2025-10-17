import { Button, Portal, CloseButton, Dialog } from "@chakra-ui/react";
import { useEffect, useState, type FormEvent } from "react";
import useUser from "../hooks/useUser";
import { useForm } from "react-hook-form";
import type { UserForm } from "../types";
import { OrbitProgress } from "react-loading-indicators";
import { auth } from "../firebasePath/firebase";

type Props = {};

export default function DrawerLogin({}: Props) {
  const [open, setOpen] = useState(false);
  const [mostrar, setMostrar] = useState(false);
  const { handleLogin, loading, error, success } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UserForm>();

  useEffect(() => {
    let timeout: number;

    if (success) {
      setMostrar(true); // Mostrar el mensaje

      timeout = setTimeout(() => {
        setMostrar(false); // Ocultar después de X tiempo
        setOpen(false);
        location.reload();
      }, 3000); // 3000 ms = 3 segundos
    }
    () => {
      clearTimeout(timeout);
    };
  }, [success]);

  useEffect(() => {
    if (error) {
      setError("password", {
        type: "Invalid auth",
        message: error,
      });
    }
  }, [error, setError]);
  const onSubmit = handleSubmit((data: UserForm) => {
    handleLogin(data.email, data.password);
  });
  if (auth.currentUser && !open) {
    return;
  }
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
              <Dialog.Title>
                {mostrar || loading ? "Iniciando sesión" : ""}
                {!loading && !mostrar ? "iniciar sesion" : ""}
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="4">
              <div className="container">
                {mostrar || loading ? (
                  <OrbitProgress
                    variant="disc"
                    color="#3237cdff"
                    size="small"
                    text=""
                    textColor=""
                  />
                ) : (
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
                      {loading ? (
                        <OrbitProgress
                          variant="disc"
                          color="#3237cdff"
                          size="small"
                          text=""
                          textColor=""
                        />
                      ) : (
                        ""
                      )}
                      {!loading && !mostrar ? (
                        <button type="submit" className={`btn btn-primary`}>
                          ingresar
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </form>
                )}
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
  );
}
