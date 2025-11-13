import {
  Button,
  Center,
  CloseButton,
  Dialog,
  DialogCloseTrigger,
  Portal,
  Separator,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import AddCategory from "./AddCategory";
import AddTool from "./AddTool";
import PendingTools from "./PendingTools";
import ToolsList from "./ToolsList";
import useUserStatus from "../../hooks/useUserStatus";

type Props = {};

export default function DialogPanelAdmin({}: Props) {
  const [addCategory, setAddCategory] = useState<boolean>(false);
  const [addTool, setAddTool] = useState<boolean>(false);
  const [pendingTool, setPendingTool] = useState<boolean>(false);
  const [currentTool, setCurrentTool] = useState<boolean>(false);
  const { isLoading } = useUserStatus();

  return (
    <>
      <Dialog.Root
        closeOnInteractOutside={false}
        placement={{ sm: "bottom", md: "top" }}
      >
        <Dialog.Trigger asChild>
          <Button
            variant={"plain"}
            borderRadius={"10px"}
            _hover={{
              bg: "rgba(255, 255, 255, 0.2)",
            }}
          >
            🖥️ Panel de administracion
          </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content
              bg={"rgba(255, 255, 255, 0.2)"}
              backdropFilter={"blur(10px)"}
              border={"1px solid rgba(255, 255, 255, 0.3)"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Dialog.Header></Dialog.Header>
              <Dialog.Body w="513px" pb="4">
                <Dialog.Title>Panel de administración</Dialog.Title>
                <div id="adminContainer" className="admin-panel">
                  <Stack
                    p="5px"
                    bg={"rgba(255, 255, 255, 0.19)"}
                    borderRadius="10px"
                  >
                    <>
                      <Button
                        onClick={() => {
                          setAddCategory(true);
                          setCurrentTool(false);
                          setAddTool(false);
                          setPendingTool(false);
                        }}
                        borderRadius={"10px"}
                        bg={"rgba(0, 110, 255, 0.75)"}
                        transition={"ease 0.5s"}
                        _hover={{
                          bg: "rgba(0, 132, 255, 0.59)",
                        }}
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
                        borderRadius={"10px"}
                        transition={"ease 0.5s"}
                        bg={"rgba(0, 110, 255, 0.75)"}
                        _hover={{
                          bg: "rgba(0, 132, 255, 0.59)",
                        }}
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
                      borderRadius={"10px"}
                      bg={"rgba(0, 110, 255, 0.75)"}
                      transition={"ease 0.5s"}
                      _hover={{
                        bg: "rgba(0, 132, 255, 0.59)",
                      }}
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
                      borderRadius={"10px"}
                      bg={"rgba(0, 110, 255, 0.75)"}
                      transition={"ease 0.5s"}
                      _hover={{
                        bg: "rgba(0, 132, 255, 0.59)",
                      }}
                    >
                      🛠️ Herramientas existentes
                    </Button>
                  </Stack>
                </div>
                <Stack>
                  <Separator
                    mt={"10px"}
                    orientation={"horizontal"}
                    border={"0.00001px solid rgb(131 126 126 / 81%)"}
                  />
                  {addCategory ? <AddCategory /> : ""}
                  {addTool ? <AddTool /> : ""}
                  {pendingTool ? <PendingTools /> : ""}
                </Stack>
                {currentTool ? (
                  <>
                    <Center>
                      <h2>Herramientas existentes</h2>
                    </Center>

                    <div id="adminToolsList" className="admin-list">
                      <ToolsList></ToolsList>
                    </div>
                    <div id="pendingToolsList" className="admin-list"></div>
                  </>
                ) : (
                  ""
                )}
              </Dialog.Body>
              <DialogCloseTrigger>
                <CloseButton
                  _hover={{ bg: "rgba(255, 255, 255, 0.2)" }}
                  borderRadius={"20px"}
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
