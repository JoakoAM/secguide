import React from "react";
import useTools from "../../hooks/useTools";
import { Button, IconButton, Stack } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";

type Props = {};

function ToolsList({}: Props) {
  const [Tools] = useTools();

  const { data: tools } = Tools;
  if (!tools) {
    return <>No se puede cargar Herramientas</>;
  }
  return (
    <>
      <Stack>
        {tools.map((t) => (
          <>
            <div>
              <IconButton
                className="btn btn-danger"
                onClick={() => console.log("Elminar herramienta:" + t.id)}
                justifyItems={"center"}
                margin={"5px"}
              >
                <MdDelete />
              </IconButton>
              <strong> {t.name}</strong> - {t.brief}
            </div>
          </>
        ))}
      </Stack>
    </>
  );
}

export default ToolsList;
