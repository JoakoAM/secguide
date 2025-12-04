import {
  Button,
  Grid,
  GridItem,
  HStack,
  Menu,
  Portal,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { type ReactNode } from "react";
import { VscThreeBars } from "react-icons/vsc";
import { Outlet } from "react-router-dom";
import CategoriesView from "../components/CategoriesView";
import stylesMenu from "../styles/Menu.module.css";
import stylesGrid from "../styles/Grid.module.css";

type Props = {
  children?: ReactNode;
};

function Layout({}: Props) {
  return (
    <>
      <Grid
        font={"caption"}
        templateAreas={`"header header" "main main"`}
        templateRows="160px 1fr"
        templateColumns={"repeat(auto-fit, minmax(280px, 1fr))"}
        justifyItems={"center"}
      >
        <GridItem className={stylesGrid.item} area={"header"}>
          <HStack>
            <VStack className={stylesGrid.vStack}>
              <h1>Cybersecurity NavTools Hub</h1>
              <h2>SecGuide 🔏</h2>
              <p>Explora las mejores herramientas y aprende cómo funcionan</p>
            </VStack>
            <Stack>
              <Menu.Root positioning={{ placement: "right" }}>
                <Menu.Trigger asChild>
                  <Button
                    className={stylesMenu.btnTrigger}
                    _hover={{ bg: "whiteAlpha.400" }}
                    variant="plain"
                    outline="none"
                    size="sm"
                  >
                    <VscThreeBars />
                  </Button>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content className={stylesMenu.content}>
                      <Stack className={stylesMenu.contentStack} wrap="wrap">
                        <Outlet />
                      </Stack>
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            </Stack>
          </HStack>
        </GridItem>
        <GridItem area={"main"}>
          <CategoriesView />
        </GridItem>
      </Grid>
    </>
  );
}

export default Layout;
