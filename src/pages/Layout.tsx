import {
  Button,
  For,
  Grid,
  GridItem,
  HStack,
  Menu,
  Portal,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { useEffect, type ReactNode } from "react";
import { VscThreeBars } from "react-icons/vsc";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import CategoriesView from "../components/CategoriesView";
import stylesMenu from "../styles/Menu.module.css";
import stylesGrid from "../styles/Grid.module.css";
import useAuth from "../contexts/AuthContext";
import LoadingAuth from "../components/LoadingAuth";
import useOpen from "../contexts/OpenContext";

type Props = {
  children?: ReactNode;
};

function Layout({}: Props) {
  const nav = useNavigate();
  const path = useLocation();
  const {
    currentUser,
    isAdmin,
    isLoadingAuth,
    loginState: { success: successLogin },
    registerState: { success: successRegister },
  } = useAuth();
  const { openMenu, setOpenMenu } = useOpen();
  useEffect(() => {
    if (!isLoadingAuth && currentUser != null) {
      const timeout = setTimeout(() => {
        if (isAdmin) {
          setOpenMenu(false);
          nav("adminpanel");
        } else {
          setOpenMenu(false);
          nav("userpanel");
        }
      }, 2500);
      return () => clearTimeout(timeout);
    }
  }, [isLoadingAuth, currentUser, isAdmin]);

  const handleLoadingAuth =
    isLoadingAuth ||
    (currentUser && path.pathname === "/" && !successLogin && !successRegister);

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
              <Menu.Root
                open={openMenu}
                onOpenChange={(e) => {
                  e.open;
                }}
                positioning={{ placement: "right" }}
              >
                <Menu.Trigger asChild>
                  <Button
                    className={stylesMenu.btnTrigger}
                    _hover={{ bg: "whiteAlpha.400" }}
                    variant="plain"
                    outline="none"
                    size="sm"
                    onClick={() => {
                      if (openMenu == false) {
                        setOpenMenu(true);
                      } else {
                        setOpenMenu(false);
                      }
                    }}
                  >
                    <VscThreeBars />
                  </Button>
                </Menu.Trigger>
                {handleLoadingAuth ? (
                  <LoadingAuth handleOpen={handleLoadingAuth} />
                ) : (
                  <Portal>
                    <Menu.Positioner>
                      <Menu.Content className={stylesMenu.content}>
                        <Stack className={stylesMenu.contentStack} wrap="wrap">
                          <Outlet />
                        </Stack>
                      </Menu.Content>
                    </Menu.Positioner>
                  </Portal>
                )}
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
