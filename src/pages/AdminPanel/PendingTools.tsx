import { IconButton } from "@chakra-ui/react";
import useTools from "../../hooks/useTools";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
type Props = {};

function PendingTools({}: Props) {
  const data = useTools();

  const [_, PendingTools] = data;
  const { data: tools } = PendingTools;
  if (!tools) {
    return;
  }

  return (
    <>
      <h3>Herramientas Pendientes de Aprobación</h3>
      <div>
        {tools.map((t) => (
          <div className="admin-item">
            <div>
              <IconButton
                className="btn btn-success"
                onClick={() => console.log("Aprobar")}
                justifyItems={"center"}
              >
                <FaCheck />
              </IconButton>{" "}
              <IconButton
                justifyItems={"center"}
                className="btn btn-danger"
                onClick={() => console.log("Eliminar")}
              >
                <MdDelete />
              </IconButton>{" "}
              <strong>{t.name}</strong> - ${t.brief}
              <span className="pending-badge">Pendiente</span>
            </div>
            <div className="admin-item-actions"></div>
          </div>
        ))}
      </div>
    </>
  );
}

export default PendingTools;
