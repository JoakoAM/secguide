import {
  Button,
  CloseButton,
  Dialog,
  DialogCloseTrigger,
  Portal,
  Separator,
  Stack,
} from "@chakra-ui/react";
import AddTool from "../../components/AddTool";
import useOpen from "../../contexts/OpenContext";
import stylesDialog from "../../styles/Dialog.module.css";
import AddCategory from "./categories/AddCategory";
import PendingTools from "./tools/PendingTools";
import AdminToolsList from "./AdminToolsList";

type Props = {};

export default function DialogPanelAdmin({}: Props) {
  const {
    openAdmin,
    setOpenAdmin,
    addCategory,
    setAddCategory,
    addTool,
    setAddTool,
    pendingTool,
    setPendingTool,
    currentTool,
    setCurrentTool,
  } = useOpen();
  return (
    <>
      <Dialog.Root
        closeOnInteractOutside={false}
        placement={{ smDown: "center", md: "top" }}
        size={{ smDown: "sm", base: "lg" }}
        open={openAdmin}
        onOpenChange={(e) => {
          e.open;
        }}
      >
        <Dialog.Trigger asChild>
          <Button
            onClick={() => {
              setOpenAdmin(true);
            }}
            animation={"fade-in 0.5s ease-out"}
            variant={"plain"}
            className={stylesDialog.btnTrigger}
          >
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
              <Dialog.Body pb="4">
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
                {currentTool ? <AdminToolsList /> : ""}
              </Dialog.Body>
              <DialogCloseTrigger
                onClick={() => {
                  setPendingTool(false);
                  setAddCategory(false);
                  setAddTool(false);
                  setCurrentTool(false);
                  setOpenAdmin(false);
                }}
                asChild
              >
                <CloseButton className={stylesDialog.btnClose} />
              </DialogCloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
}
