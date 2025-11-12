import { HStack, IconButton, Separator, Stack } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import usedeleteTool from "../../hooks/useDeleteTool";
import useTools from "../../hooks/useTools";

type Props = {};

function ToolsList({}: Props) {
  const [Tools] = useTools();
  const { mutate: deleteTool, isPending, error } = usedeleteTool();

  const { data: tools } = Tools;
  if (!tools) {
    return <span>No hay Herramientas</span>;
  }

  return (
    <>
      <Stack borderRadius="10px" p={"5px"} gap={4}>
        {tools.map((t) => (
          <>
            <HStack
              bg={"rgba(255, 255, 255, 0.19)"}
              borderRadius="10px"
              p={"5px"}
              gap={4}
              key={t.id}
            >
              <span style={{ width: "55px", fontWeight: "bold" }}>
                {t.name}
              </span>
              <Separator
                borderColor={"rgba(0, 0, 0, 0.19)"}
                orientation="vertical"
                height="30px"
              />
              <span style={{ maxWidth: "291px", width: "291px" }}>
                {t.brief}
              </span>
              <div>
                <IconButton
                  onClick={() => deleteTool(t)}
                  justifyItems={"center"}
                  bg={"rgba(255, 0, 0, 0.2)"}
                  _hover={{
                    bg: "rgba(255, 0, 0, 0.59)",
                  }}
                  rounded={"lg"}
                  margin={"5px"}
                >
                  <MdDelete />
                </IconButton>
              </div>
            </HStack>
          </>
        ))}
      </Stack>
    </>
  );
}

export default ToolsList;
