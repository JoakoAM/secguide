import {
  Text,
  Drawer,
  Button,
  Portal,
  Kbd,
  CloseButton,
} from "@chakra-ui/react";

type Props = {};

export default function DrawerPanel({}: Props) {
  return (
    <>
      <Drawer.Root placement={{ mdDown: "bottom", md: "start" }}>
        <Drawer.Trigger asChild>
          <Button variant={"plain"}>👤 Mi
        Panel</Button>
        </Drawer.Trigger>
        <Portal>
          <Drawer.Positioner top={"120px"}>
            <Drawer.Content
              boxShadow={"0 10px 30px rgba(0, 0, 0, 0.2)"}
              borderRadius={"10px"}
              borderTopLeftRadius={"0PX"}
            >
              <Drawer.Header>
                <Drawer.Title>Drawer Title</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                Press the <Kbd>esc</Kbd> key to close the drawer.
              </Drawer.Body>
              <Drawer.Footer>
                <Drawer.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Drawer.ActionTrigger>
                <Button>Save</Button>
              </Drawer.Footer>
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
