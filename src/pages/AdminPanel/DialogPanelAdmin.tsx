import {
  Button,
  CloseButton,
  Dialog,
  DialogCloseTrigger,
  Portal,
  Separator,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import AddCategory from "./categories/AddCategory";
import AddTool from "./tools/AddTool";
import PendingTools from "./tools/PendingTools";
import ToolsList from "./ToolsList";
import stylesDialog from "../../styles/Dialog.module.css";

type Props = {};

export default function DialogPanelAdmin({}: Props) {
  const [addCategory, setAddCategory] = useState<boolean>(false);
  const [addTool, setAddTool] = useState<boolean>(false);
  const [pendingTool, setPendingTool] = useState<boolean>(false);
  const [currentTool, setCurrentTool] = useState<boolean>(false);

  return (
    <>
      <Dialog.Root
        closeOnInteractOutside={false}
        placement={{ sm: "bottom", md: "top" }}
      >
        <Dialog.Trigger asChild>
          <Button variant={"plain"} className={stylesDialog.btnTrigger}>
            🖥️ Panel de administracion
          </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content
              className={stylesDialog.content}
              justifyContent={"space-between"}
            >
              <Dialog.Header></Dialog.Header>
              <Dialog.Body w="513px" pb="4">
                <Dialog.Title justifySelf={"center"}>
                  Panel de administración
                </Dialog.Title>

                <Stack
                  p="5px"
                  bg={"rgba(255, 255, 255, 0.19)"}
                  borderRadius="10px"
                >
                  <>
                    <Button
                      onClick={() => {
                        console.log("botonClickeado");
                        setAddCategory(true);
                        setCurrentTool(false);
                        setAddTool(false);
                        setPendingTool(false);
                      }}
                      disabled={addCategory}
                      className={stylesDialog.btnBody}
                    >
                      ➕ Añadir categoría
                    </Button>
                    <Button
                      onClick={() => {
                        setAddTool(true);
                        setCurrentTool(false);
                        setAddCategory(false);
                        setPendingTool(false);
                      }}
                      disabled={addTool}
                      className={stylesDialog.btnBody}
                    >
                      🔨 Añadir herramienta
                    </Button>
                  </>
                  <Button
                    onClick={() => {
                      setPendingTool(true);
                      setCurrentTool(false);
                      setAddCategory(false);
                      setAddTool(false);
                    }}
                    disabled={pendingTool}
                    className={stylesDialog.btnBody}
                  >
                    ⏳ Herramientas pendientes
                  </Button>
                  <Button
                    onClick={() => {
                      setCurrentTool(true);
                      setPendingTool(false);
                      setAddCategory(false);
                      setAddTool(false);
                    }}
                    disabled={currentTool}
                    className={stylesDialog.btnBody}
                  >
                    🛠️ Herramientas existentes
                  </Button>
                </Stack>

                <Separator
                  mt={"10px"}
                  orientation={"horizontal"}
                  border={"0.00001px solid rgb(131 126 126 / 81%)"}
                />
                {addCategory ? <AddCategory /> : ""}
                {addTool ? <AddTool /> : ""}
                {pendingTool ? <PendingTools /> : ""}
                {currentTool ? <ToolsList /> : ""}
              </Dialog.Body>
              <DialogCloseTrigger asChild>
                <CloseButton
                  className={stylesDialog.btnClose}
                  onClick={() => {
                    setPendingTool(false);
                    setAddCategory(false);
                    setAddTool(false);
                    setCurrentTool(false);
                  }}
                />
              </DialogCloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
}
