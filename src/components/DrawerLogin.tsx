import { Drawer, Button, Portal, CloseButton } from "@chakra-ui/react";
import type { FormEvent } from "react";
import useUser from "../hooks/useUser";

type Props = {};

export default function DrawerLogin({}: Props) {
  const { handleLogin } = useUser();
  return (
    <>
      <Drawer.Root placement={{ mdDown: "bottom", md: "start" }}>
        <Drawer.Trigger asChild>
          <Button variant={"plain"}>🔐 Iniciar Sesión</Button>
        </Drawer.Trigger>
        <Portal>
          <Drawer.Positioner md={{ top: "120px" }}>
            <Drawer.Content
              boxShadow={"0 10px 30px rgba(0, 0, 0, 0.2)"}
              borderRadius={"10px"}
              borderTopLeftRadius={"0PX"}
            >
              <Drawer.Header>
                <Drawer.Title>Iniciar Sesion</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <div className="container">
                  <form
                    onSubmit={(e: FormEvent) => {
                      handleLogin(e);
                    }}
                  >
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        name="email"
                        type="email"
                        className="form-control"
                      ></input>
                      <div className="form-text" id="emailHelp">
                        Nunca compartiremos tus datos con terceros :D
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Contraseña</label>
                      <input
                        name="password"
                        type="password"
                        className="form-control"
                      ></input>
                      <div className="form-text" id="emailHelp"></div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      ingresar
                    </button>
                  </form>
                </div>
                <Button type={"submit"}>ingresar</Button>
              </Drawer.Body>
              <Drawer.Footer></Drawer.Footer>
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
