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
        <GridItem
          boxShadow={"0 10px 30px rgba(0, 0, 0, 0.2)"}
          color={"#fff"}
          h={{ md: "160px" }}
          bg={"rgba(255, 255, 255, 0.2)"}
          backdropFilter={"blur(10px)"}
          border={"1px solid rgba(255, 255, 255, 0.3)"}
          alignItems={"center"}
          pl={2}
          area={"header"}
          position={"sticky"}
          top="0px"
          zIndex={1}
          borderRadius="12px"
          width={{ md: "calc(100% - 70rem)" }}
          justifySelf={"center"}
          justifyItems={"center"}
        >
          <HStack>
            <VStack w="720px" color={"black"} alignContent={"center"}>
              <h1
                style={{
                  fontWeight: "bold",
                  textShadow: "rgb(0 0 0 / 79%) 2px 2px 4px",
                  color: "white",
                }}
              >
                Cybersecurity NavTools Hub
              </h1>
              <h2
                style={{
                  fontWeight: "bold",
                  textShadow: "rgb(0 0 0 / 79%) 2px 2px 4px",
                  color: "white",
                }}
              >
                SecGuide 🔏
              </h2>
              <p
                style={{
                  textShadow: "rgb(0 0 0 / 79%) 2px 2px 4px",
                  color: "white",
                }}
              >
                Explora las mejores herramientas y aprende cómo funcionan
              </p>
            </VStack>
            <Stack>
              <Menu.Root positioning={{ placement: "right" }}>
                <Menu.Trigger asChild>
                  <Button
                    h={"160px"}
                    borderTopRightRadius={"10px"}
                    borderEndEndRadius={"10px"}
                    bg="transparent"
                    _hover={{ bg: "whiteAlpha.400" }}
                    _focus={{ bg: "transparent" }}
                    _active={{ bg: "transparent" }}
                    variant="plain"
                    outline="none"
                    size="sm"
                  >
                    <VscThreeBars />
                  </Button>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content
                      bg={"rgba(255, 255, 255, 0.2)"}
                      backdropFilter={"blur(10px)"}
                      border={"1px solid rgba(255, 255, 255, 0.3)"}
                      borderRadius={"10px"}
                      height={"160px"}
                      width={"auto"}
                    >
                      <Stack
                        h={"100%"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        gap="1"
                        wrap="wrap"
                      >
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
