import { useForm } from "react-hook-form";
import useAuth from "../../contexts/AuthContext";
import type { FormType } from "../../types";

type Props = {};

function RegisterForm({}: Props) {
  const { register, handleSubmit } = useForm<FormType>();

  const { registerState, handleRegister } = useAuth();

  return (
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
          {registerState.success ? (
            <>
              <span>{`Registrado con exito :D`}</span>
            </>
          ) : (
            ""
          )}
          {registerState.error ? (
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
  );
}

export default RegisterForm;
