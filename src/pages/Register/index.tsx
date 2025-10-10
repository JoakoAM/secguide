import type { FormEvent } from "react";
import { register } from "../../components/firebase";

type Props = {
  onSubmit: (e: FormEvent) => void;
  success: boolean;
  error: boolean;
};

const Register = ({ onSubmit, success, error }: Props) => {
  return (
    <div className="container">
      <form>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" className="form-control"></input>
          <div className="form-text" id="emailHelp">
            Nunca compartiremos tus datos con terceros :D
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input type="text" className="form-control"></input>
          <div className="form-text" id="emailHelp"></div>
        </div>
        <div className="mb-3">
          <label className="form-label">Correos</label>
          <input type="text" className="form-control"></input>
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
        <button
          type="button"
          onClick={(e: FormEvent) => {
            onSubmit(e);
          }}
          className="btn btn-primary"
        >
          ingresar
        </button>
      </form>
    </div>
  );
};

export default Register;
