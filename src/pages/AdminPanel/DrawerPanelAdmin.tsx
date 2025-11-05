import {
  Button,
  Portal,
  CloseButton,
  Stack,
  Dialog,
  DialogCloseTrigger,
} from "@chakra-ui/react";
import { useState } from "react";

import CategorySelect from "../../components/CategorySelect";

type Props = {};

export default function DrawerPanelAdmin({}: Props) {
  const [addCategory, setAddCategory] = useState<boolean>(false);
  const [addTool, setAddTool] = useState<boolean>(false);
  return (
    <>
      <Dialog.Root
        closeOnInteractOutside={false}
        placement={{ sm: "bottom", md: "center" }}
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
              <Dialog.Header alignSelf={"center"}>
                <Dialog.Title>Panel de Administración</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body pb="4">
                <div id="adminContainer" className="admin-panel">
                  <Stack alignItems={"start"}>
                    <>
                      <Button
                        onClick={() => {
                          setAddCategory(true);
                          setAddTool(false);
                        }}
                        variant={"plain"}
                        borderRadius={"10px"}
                        _hover={{
                          bg: "rgba(255, 255, 255, 0.2)",
                        }}
                      >
                        ➕ Añadir Categoría
                      </Button>
                      <Button
                        onClick={() => {
                          setAddTool(true);
                          setAddCategory(false);
                        }}
                        variant={"plain"}
                        borderRadius={"10px"}
                        _hover={{
                          bg: "rgba(255, 255, 255, 0.2)",
                        }}
                      >
                        🛠️ Añadir Herramienta
                      </Button>
                    </>
                    <Button
                      onClick={() => {
                        setAddTool(true);
                      }}
                      variant={"plain"}
                      borderRadius={"10px"}
                      _hover={{
                        bg: "rgba(255, 255, 255, 0.2)",
                      }}
                    >
                      ⏳ Herramientas Pendientes
                    </Button>
                  </Stack>
                </div>
                <Stack>
                  {addCategory ? (
                    <div id="addCategoryForm" className="admin-form">
                      <h3>Añadir Nueva Categoría</h3>
                      <div className="mb-3">
                        <label className="form-label">
                          Nombre de la categoría
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="categoryName"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          Descripción de la categoría
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="categoryDescription"
                        />
                      </div>
                      <button className="btn btn-primary">
                        Guardar Categoría
                      </button>
                    </div>
                  ) : null}

                  {addTool ? (
                    <Stack
                      h={"100%"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      gap="1"
                      wrap="wrap"
                    >
                      <div id="addToolForm" className="admin-form">
                        <h3>Añadir Nueva Herramienta</h3>
                        <div className="mb-3">
                          <label className="form-label">
                            Nombre de la herramienta
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="toolName"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">
                            Descripción breve
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="toolBrief"
                          />
                        </div>
                        <CategorySelect></CategorySelect>
                        <div className="mb-3">
                          <label className="form-label">Funcionalidades</label>
                          <input
                            type="text"
                            className="form-control"
                            id="toolFunc"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Plataformas</label>
                          <input
                            type="text"
                            className="form-control"
                            id="toolPlatform"
                            placeholder="Win/Linux/macOS"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Licencia</label>
                          <input
                            type="text"
                            className="form-control"
                            id="toolLicense"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Enlace oficial</label>
                          <input
                            type="text"
                            className="form-control"
                            id="toolLink"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">
                            Artículo descriptivo
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="toolArticle"
                          />
                        </div>

                        <button className="form-submit">
                          Guardar Herramienta
                        </button>
                      </div>
                    </Stack>
                  ) : null}
                </Stack>
                <div id="adminCategoriesList" className="admin-list"></div>
                <div id="adminToolsList" className="admin-list"></div>
                <div id="pendingToolsList" className="admin-list"></div>
              </Dialog.Body>
              <DialogCloseTrigger>
                <CloseButton
                  _hover={{ bg: "rgba(255, 255, 255, 0.2)" }}
                  borderRadius={"20px"}
                />
              </DialogCloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
}
