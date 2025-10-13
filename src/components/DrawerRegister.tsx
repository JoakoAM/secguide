import { Drawer, Button, Portal, CloseButton } from "@chakra-ui/react";
import type { FormEvent } from "react";
import Register from "./Register";

type Props = {
  onSubmit: (e: FormEvent) => void;
  success: boolean;
  error: boolean;
};

export default function DrawerLogin({ onSubmit, success, error }: Props) {
  return (
    <>
      <Drawer.Root placement={{ mdDown: "bottom", md: "start" }}>
        <Drawer.Trigger asChild>
          <Button variant={"plain"}>📝 Registrarse</Button>
        </Drawer.Trigger>
        <Portal>
          <Drawer.Positioner md={{ top: "120px" }}>
            <Drawer.Content
              boxShadow={"0 10px 30px rgba(0, 0, 0, 0.2)"}
              borderRadius={"10px"}
              borderTopLeftRadius={"0PX"}
            >
              <Drawer.Header>
                <Drawer.Title>Registrarse</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <Register
                  error={error}
                  onSubmit={onSubmit}
                  success={success}
                ></Register>
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
