import { Drawer, Button, Portal, CloseButton, Stack } from "@chakra-ui/react";
import { useState } from "react";
import useUser from "../hooks/useUser";

type Props = {};

export default function DrawerPanelAdmin({}: Props) {
  const { isAdmin } = useUser();
  const [addCategory, setAddCategory] = useState<boolean>(false);
  const [addTool, setAddTool] = useState<boolean>(false);
  if (!isAdmin) {
    return;
  }
  return (
    <>
      <Drawer.Root placement={{ mdDown: "bottom", md: "start" }}>
        <Drawer.Trigger asChild>
          <Button variant={"plain"}>🖥️ Panel de administracion </Button>
        </Drawer.Trigger>
        <Portal>
          <Drawer.Positioner top={"120px"}>
            <Drawer.Content
              boxShadow={"0 10px 30px rgba(0, 0, 0, 0.2)"}
              borderRadius={"10px"}
              borderTopLeftRadius={"0PX"}
            >
              <Drawer.Header>
                <Drawer.Title>Panel de Administración</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <div id="adminContainer" className="admin-panel">
                  <Stack>
                    <>
                      <button
                        onClick={() => {
                          setAddCategory(true);
                        }}
                        className="admin-action-btn"
                      >
                        ➕ Añadir Categoría
                      </button>
                    </>
                    <button
                      onClick={() => {
                        setAddTool(true);
                      }}
                      className="admin-action-btn"
                    >
                      🛠️ Añadir Herramienta
                    </button>
                    <button className="admin-action-btn">
                      ⏳ Herramientas Pendientes
                    </button>
                  </Stack>
                </div>
                {addCategory ? (
                  <div id="addCategoryForm" className="admin-form">
                    <h3>Añadir Nueva Categoría</h3>
                    <div className="form-row">
                      <input
                        type="text"
                        id="categoryName"
                        placeholder="Nombre de la categoría"
                      />
                    </div>
                    <div className="form-row">
                      <input
                        type="text"
                        id="categoryDesc"
                        placeholder="Descripción de la categoría"
                      />
                    </div>
                    <button className="form-submit">Guardar Categoría</button>
                  </div>
                ) : null}

                {addTool ? (
                  <div id="addToolForm" className="admin-form">
                    <h3>Añadir Nueva Herramienta</h3>
                    <div className="form-row">
                      <input
                        type="text"
                        id="toolName"
                        placeholder="Nombre de la herramienta"
                      />
                    </div>
                    <div className="form-row">
                      <input
                        type="text"
                        id="toolBrief"
                        placeholder="Descripción breve"
                      />
                    </div>
                    <div className="form-row">
                      <select id="toolCategory"></select>
                    </div>
                    <div className="form-row">
                      <input
                        type="text"
                        id="toolFunc"
                        placeholder="Funcionalidades"
                      />
                    </div>
                    <div className="form-row">
                      <input
                        type="text"
                        id="toolPlatform"
                        placeholder="Plataformas (Win/Linux/macOS)"
                      />
                    </div>
                    <div className="form-row">
                      <input
                        type="text"
                        id="toolLicense"
                        placeholder="Licencia"
                      />
                    </div>
                    <div className="form-row">
                      <input
                        type="text"
                        id="toolLink"
                        placeholder="Enlace oficial"
                      />
                    </div>
                    <div className=" form-row">
                      <textarea
                        id="toolArticle"
                        placeholder="Artículo descriptivo"
                      ></textarea>
                    </div>
                    <button className="form-submit">Guardar Herramienta</button>
                  </div>
                ) : null}
                <div id="adminCategoriesList" className="admin-list"></div>
                <div id="adminToolsList" className="admin-list"></div>
                <div id="pendingToolsList" className="admin-list"></div>
              </Drawer.Body>
              <Drawer.CloseTrigger asChild>
                <CloseButton borderRadius={"10px"} size="sm" />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  );
}
