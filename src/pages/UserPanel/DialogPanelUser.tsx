import {
  Button,
  Center,
  CloseButton,
  Dialog,
  Portal,
  Separator,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import AddTool from "../AdminPanel/tools/AddTool";
import ToolsList from "../AdminPanel/ToolsList";

type Props = {};

export default function DialogPanelUser({}: Props) {
  const [addTool, setAddTool] = useState<boolean>(false);
  const [tools, setTools] = useState<boolean>(false);
  return (
    <>
      <Dialog.Root placement="center" motionPreset="slide-in-bottom">
        <Dialog.Trigger asChild>
          <Button
            variant={"plain"}
            borderRadius={"10px"}
            _hover={{
              bg: "rgba(255, 255, 255, 0.2)",
            }}
          >
            👤 Mi Panel
          </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content
              bg={"rgba(255, 255, 255, 0.2)"}
              backdropFilter={"blur(10px)"}
              border={"1px solid rgba(255, 255, 255, 0.3)"}
            >
              <Dialog.Header>
                <Dialog.CloseTrigger asChild>
                  <CloseButton onClick={() => setAddTool(false)} size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Header>
              <Dialog.Body>
                <Dialog.Title justifySelf={"center"}>
                  Panel de usuario
                </Dialog.Title>
                <Stack
                  p="5px"
                  bg={"rgba(255, 255, 255, 0.19)"}
                  borderRadius="10px"
                >
                  <Button
                    onClick={() => {
                      setAddTool(true);
                    }}
                    borderRadius={"10px"}
                    transition={"ease 0.5s"}
                    bg={"rgba(0, 110, 255, 0.75)"}
                    _hover={{
                      bg: "rgba(0, 132, 255, 0.59)",
                    }}
                  >
                    🔨 Sugerir herramienta
                  </Button>
                  <Button
                    onClick={() => {
                      setTools(true);
                    }}
                    borderRadius={"10px"}
                    transition={"ease 0.5s"}
                    bg={"rgba(0, 110, 255, 0.75)"}
                    _hover={{
                      bg: "rgba(0, 132, 255, 0.59)",
                    }}
                  >
                    🛠️ Mis herramientas
                  </Button>
                </Stack>
                <Separator
                  mt={"10px"}
                  orientation={"horizontal"}
                  border={"0.00001px solid rgb(131 126 126 / 81%)"}
                />
                <Center>{addTool ? <AddTool /> : ""}</Center>
                {tools ? <ToolsList /> : ""}
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
}
