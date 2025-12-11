import { Button, Stack } from "@chakra-ui/react";
import { type FormEvent } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../contexts/AuthContext";
import stylesDialog from "../../styles/Dialog.module.css";
import type { UserForm } from "../../types";

type Props = {};

function LoginForm({}: Props) {
  const { handleLogin } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    // setError,
  } = useForm<UserForm>();

  const onSubmit = handleSubmit((data: UserForm) => {
    handleLogin(data.email, data.password);
  });
  return (
    <Stack className="container">
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
            <span style={{ color: "red" }}>{errors.email.message}</span>
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
          {errors.password ? <span>{errors.password?.message}</span> : ""}

          <div className="form-text" id="emailHelp"></div>
        </div>
        <Button type="submit" className={stylesDialog.btnBody}>
          ingresar
        </Button>
      </form>
    </Stack>
  );
}

export default LoginForm;
