import {
  Button,
  Grid,
  GridItem,
  Portal,
  Stack,
  HStack,
  Menu,
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
              <h1
                style={{
                  fontWeight: "bold",
                  textShadow: "rgb(0 0 0 / 79%) 2px 2px 4px",
                  color: "white",
                }}
              >
                Cybersecurity Tools Hub
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
            </Stack>
            <Stack justifySelf={"center"} justifyContent={"end"}>
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
                        <DrawerPanel></DrawerPanel>
                        <DrawerPanelAdmin></DrawerPanelAdmin>
                        <DrawerLogin></DrawerLogin>
                        <DrawerRegister></DrawerRegister>
                      </Stack>
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
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
