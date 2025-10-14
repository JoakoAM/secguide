import {
  Button,
  CloseButton,
  Drawer,
  Grid,
  GridItem,
  Portal,
  Separator,
  Stack,
  HStack,
} from "@chakra-ui/react";
import CategoriesView from "../../components/CategoriesView";
import DrawerPanel from "../../components/DrawerPanel";
import DrawerLogin from "../../components/DrawerLogin";
import DrawerRegister from "../../components/DrawerRegister";
import DrawerPanelAdmin from "../../components/DrawerPanelAdmin";
import { VscThreeBars } from "react-icons/vsc";
type Props = {};

const Hub = ({}: Props) => {
  return (
    <>
      <Grid
        font={"caption"}
        bg={"linear-gradient(135deg, #667eea 0%, #764ba2 100%)"}
        templateAreas={`"header header" "main main"`}
        templateRows="160px 1fr"
        templateColumns={"repeat(auto-fit, minmax(280px, 1fr))"}
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
          alignContent={"center"}
        >
          <HStack justifyContent={"space-between"}>
            <Stack
              color={"black"}
              alignItems={"center"}
              justifyItems={"center"}
              position={"relative"}
              left={"155px"}
            >
              <h1>Cybersecurity Tools Hub</h1>
              <h2>SecGuide</h2>
              <p>Explora las mejores herramientas y aprende cómo funcionan</p>
            </Stack>
            <Stack justifySelf={"center"} justifyContent={"end"}>
              <Drawer.Root placement={{ sm: "bottom", md: "top" }}>
                <Drawer.Trigger asChild>
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
                </Drawer.Trigger>
                <Portal>
                  <Drawer.Positioner
                    h={"auto"}
                    w={"auto"}
                    top={"30px"}
                    left={"1350px"}
                  >
                    <Drawer.Content
                      bg={"rgba(255, 255, 255, 0.2)"}
                      backdropFilter={"blur(10px)"}
                      border={"1px solid rgba(255, 255, 255, 0.3)"}
                      borderRadius={"10px"}
                      height={"90px"}
                      width={"auto"}
                    >
                      <Stack
                        h={"100%"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        gap="1"
                        wrap="wrap"
                      >
                        {/* <button
                              id="backButton"
                              className="nav-button"
                              onClick={() => {
                                "goBack()";
                              }}
                            >
                              ← Volver
                            </button>
                            <button
                              id="homeButton"
                              className="nav-button"
                              onClick={() => {
                                "goHome()";
                              }}
                            >
                              🏠 Inicio
                            </button>
                            <button
                              id="logoutButton"
                              className="nav-button"
                              onClick={() => {
                                "logOut";
                              }}
                            >
                              🚪 Cerrar Sesión
                            </button> */}

                        {/* <DrawerPanel></DrawerPanel> */}
                        <DrawerPanelAdmin></DrawerPanelAdmin>
                        <DrawerLogin></DrawerLogin>
                        <DrawerRegister></DrawerRegister>
                      </Stack>

                      <Drawer.Footer></Drawer.Footer>
                    </Drawer.Content>
                  </Drawer.Positioner>
                </Portal>
              </Drawer.Root>
            </Stack>
          </HStack>
        </GridItem>
        <GridItem
          bg={"linear-gradient(135deg, #667eea 0%, #764ba2 100%)"}
          area={"main"}
        >
          <CategoriesView></CategoriesView>
        </GridItem>
      </Grid>
    </>
  );
};

export default Hub;
