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
import AddTool from "../../components/AddTool";
import useOpen from "../../contexts/OpenContext";
import stylesDialog from "../../styles/Dialog.module.css";
import UserTools from "./UserTools";

type Props = {};

export default function DialogPanelUser({}: Props) {
  const { openUser, setOpenUser, addTool, setAddTool } = useOpen();
  const [tools, setTools] = useState<boolean>(false);
  return (
    <>
      <Dialog.Root
        open={openUser}
        onOpenChange={(e) => e.open}
        placement="top"
        motionPreset="slide-in-bottom"
      >
        <Dialog.Trigger asChild>
          <Button
            animation="fade-in 0.5s ease-out"
            variant={"plain"}
            className={stylesDialog.btnTrigger}
            onClick={() => {
              setOpenUser(true);
            }}
          >
            👤 Mi Panel
          </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content className={stylesDialog.content}>
              <Dialog.Header>
                <Dialog.CloseTrigger asChild>
                  <CloseButton
                    className={stylesDialog.btnClose}
                    onClick={() => {
                      setAddTool(false);
                      setTools(false);
                      setOpenUser(false);
                    }}
                    size="sm"
                  />
                </Dialog.CloseTrigger>
              </Dialog.Header>
              <Dialog.Body w="513px" pb="4">
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
                      setTools(false);
                    }}
                    className={stylesDialog.btnBody}
                    disabled={addTool}
                  >
                    🔨 Sugerir herramienta
                  </Button>
                  <Button
                    key={`${tools}`}
                    onClick={() => {
                      setTools(true);
                      setAddTool(false);
                    }}
                    disabled={tools}
                    className={stylesDialog.btnBody}
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
                {tools ? <UserTools /> : ""}
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
}
