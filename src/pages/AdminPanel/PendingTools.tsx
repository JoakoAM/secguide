import { Center, HStack, IconButton, Separator } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useTools from "../../hooks/useTools";
import useDeleteTool from "../../hooks/useDeleteTool";
import useAproveTool from "../../hooks/useAproveTool";
type Props = {};

function PendingTools({}: Props) {
  const data = useTools();
  const {
    mutate: deleteTool,
    isPending: isPendingDelete,
    error: errorDelete,
  } = useDeleteTool();
  const {
    mutate: aproveTool,
    isPending: isPendingAprove,
    error: errorAprove,
  } = useAproveTool();

  const [_, PendingTools] = data;
  const { data: tools } = PendingTools;
  if (!tools) {
    return;
  }

  return (
    <>
      <Center>
        <h2>Herramientas pendientes </h2>
      </Center>
      {tools.length == 0 ? (
        <Center>No hay herramientas pendientes</Center>
      ) : (
        <>
          {isPendingDelete ? <h5>Eliminando tool</h5> : ""}
          {errorDelete ? <h5>{errorDelete.message}</h5> : ""}
          {isPendingAprove ? <h5>Aprobando tool</h5> : ""}
          {errorAprove ? <h5>errorAprove.message</h5> : ""}
          {tools.map((t) => (
            <>
              <HStack
                bg={"rgba(255, 255, 255, 0.19)"}
                borderRadius="10px"
                p={"5px"}
                gap={4}
              >
                <span style={{ width: "55px", fontWeight: "bold" }}>
                  {t.name}
                </span>{" "}
                <Separator
                  borderColor={"rgba(0, 0, 0, 0.19)"}
                  orientation="vertical"
                  height="30px"
                />
                <span style={{ maxWidth: "241px", width: "241px" }}>
                  {t.brief}
                </span>
                <IconButton
                  justifyItems={"center"}
                  bg={"rgba(15, 128, 5, 0.2)"}
                  _hover={{
                    bg: "rgba(15, 128, 5, 0.59)",
                  }}
                  rounded={"lg"}
                  onClick={async () => {
                    aproveTool(t);
                  }}
                >
                  <FaCheck />
                </IconButton>{" "}
                <IconButton
                  justifyItems={"center"}
                  bg={"rgba(255, 0, 0, 0.2)"}
                  _hover={{
                    bg: "rgba(255, 0, 0, 0.59)",
                  }}
                  rounded={"lg"}
                  onClick={() => {
                    deleteTool(t);
                  }}
                >
                  <MdDelete />
                </IconButton>{" "}
              </HStack>
              <div className="admin-item-actions"></div>
            </>
          ))}
        </>
      )}
    </>
  );
}

export default PendingTools;
