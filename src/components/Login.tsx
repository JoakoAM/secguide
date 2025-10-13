import type { FormEvent } from "react";

type Props = {
  onSubmit: (e: FormEvent) => void;
};

const Login = ({ onSubmit }: Props) => {
  return (
    <>
      <div className="container">
        <form
          onSubmit={(e: FormEvent) => {
            onSubmit(e);
          }}
        >
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input name="email" type="email" className="form-control"></input>
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
    </>
  );
};

export default Login;
