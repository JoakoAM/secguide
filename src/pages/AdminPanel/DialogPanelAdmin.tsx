import {
  Button,
  CloseButton,
  Dialog,
  DialogCloseTrigger,
  Portal,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import CategorySelect from "./CategorySelect";
import { query } from "firebase/firestore";
import { useQueryClient } from "@tanstack/react-query";
import { type Categories } from "../../types";
import ToolsList from "./ToolsList";
import PendingTools from "./PendingTools";

type Props = {};

export default function DialogPanelAdmin({}: Props) {
  const [addCategory, setAddCategory] = useState<boolean>(false);
  const [addTool, setAddTool] = useState<boolean>(false);
  const [pendingTool, setPendingTool] = useState<boolean>(false);

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
              <Dialog.Header alignSelf={"center"}>
                <Dialog.Title>Panel de Administración</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body pb="4">
                <div id="adminContainer" className="admin-panel">
                  <Stack>
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
                        setPendingTool(true);
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
                    <Stack h={"100%"} gap="1">
                      <div id="addToolForm" className="admin-form">
                        <h3>Añadir Nueva Herramienta</h3>
                        <div className="mb-3">
                          <label className="form-label"></label>
                          <input
                            type="text"
                            className="form-control"
                            id="toolName"
                            placeholder="Nombre de la herramienta"
                          />
                        </div>
                        <div className="mb-3">
                          <textarea
                            style={{ maxHeight: "100px" }}
                            className={"form-control"}
                            placeholder="Descripción breve"
                            id="toolBrief"
                          ></textarea>
                        </div>
                        <div className="mb-3">
                          <CategorySelect></CategorySelect>
                        </div>
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="toolFunc"
                            placeholder="Funcionalidades"
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="toolPlatform"
                            placeholder="Plataformas"
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="toolLicense"
                            placeholder="Licencia"
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="toolLink"
                            placeholder="Enlace oficial"
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="toolArticle"
                            placeholder="Artículo descriptivo"
                          />
                        </div>

                        <button className="btn btn-primary">
                          Guardar Herramienta
                        </button>
                      </div>
                    </Stack>
                  ) : null}

                  {pendingTool ? <PendingTools></PendingTools> : ""}
                </Stack>
                <h2>Herramientas existentes</h2>
                <div id="adminToolsList" className="admin-list">
                  <ToolsList></ToolsList>
                </div>
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
