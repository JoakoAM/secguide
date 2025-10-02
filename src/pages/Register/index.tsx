import { register } from "../../components/firebase";

type Props = {};

const Register = ({}: Props) => {
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
        <button
          type="button"
          onClick={() => {
            register(); 
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
