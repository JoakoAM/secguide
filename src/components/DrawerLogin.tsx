import {
  Text,
  Drawer,
  Button,
  Portal,
  Kbd,
  CloseButton,
} from "@chakra-ui/react";
import type { FormEvent } from "react";
import Login from "./Login";

type Props = {
  onSubmit: (e: FormEvent) => void;
};

export default function DrawerLogin({ onSubmit }: Props) {
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
                <Login onSubmit={onSubmit}></Login>
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
