import {
  Center,
  HStack,
  IconButton,
  Separator,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useDeleteTool from "../../../hooks/useDeleteTool";
import useAproveTool from "../../../hooks/useAproveTool";
import Empty from "../../../components/Empty";
import { FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useUserTools from "../../../hooks/useUserTools";
import stylesDialog from "../../../styles/Dialog.module.css";
type Props = {};

function PendingTools({}: Props) {
  const [mostrar, setMostrar] = useState(false);
  useEffect(() => {
    let timeout: number;
    timeout = setTimeout(() => {
      setMostrar(true);
    }, 1500);
    () => {
      clearTimeout(timeout);
    };
  }, []);
  const {
    mutate: deleteTool,
    // isPending: isPendingDelete,
    // error: errorDelete,
  } = useDeleteTool();
  const {
    mutate: aproveTool,
    // isPending: isPendingAprove,
    // error: errorAprove,
  } = useAproveTool();
  const { data: tools } = useUserTools();

  if (!tools) {
    return;
  }
  if (mostrar) {
    return (
      <>
        <Center>
          <h2>Herramientas pendientes </h2>
        </Center>
        {tools.length == 0 ? (
          <Empty />
        ) : (
          <>
            {/* {isPendingDelete ? <h5>Eliminando tool</h5> : ""}
            {errorDelete ? <h5>{errorDelete.message}</h5> : ""}
            {isPendingAprove ? <h5>Aprobando tool</h5> : ""}
            {errorAprove ? <h5>errorAprove.message</h5> : ""}
            Estas fueron pensadas para el momento de querer eliminar o aprobar
            un tool salga un pequeño mensaje (puede cambiarse por otra cosa en
            un futuro) */}
            {tools.map((t) => (
              <>
                <HStack
                  bg={"rgba(255, 255, 255, 0.19)"}
                  borderRadius="10px"
                  p={"5px"}
                  gap={4}
                  margin={"5px"}
                  key={t.id}
                  animation="fade-in 0.5s ease-out"
                >
                  <span className={stylesDialog.hStackSpanName}>{t.name}</span>{" "}
                  <Separator
                    borderColor={"rgba(0, 0, 0, 0.19)"}
                    orientation="vertical"
                    height="30px"
                  />
                  <span className={stylesDialog.hStackSpanBrief}>
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
  return (
    <Center mt={"20px"}>
      <Spinner w="70px" h="70px" />
    </Center>
  );
}

export default PendingTools;
