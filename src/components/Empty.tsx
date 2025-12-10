import { Button, EmptyState, Stack, VStack } from "@chakra-ui/react";
import { FaRegSmileWink } from "react-icons/fa";
import { IoSadOutline } from "react-icons/io5";
import { useLocation } from "react-router";
import useOpen from "../contexts/OpenContext";
import { useEffect } from "react";
type Props = {};

function Empty({}: Props) {
  const {
    openLog,
    setFromEmpty,
    setOpenAdmin,
    setOpenUser,
    setAddTool,
    setOpenMenu,
  } = useOpen();
  useEffect(() => {
    if (!openLog) {
      setFromEmpty(false);
    }
  }, [openLog]);
  const path = useLocation();
  return (
    <Stack
      bg={"rgba(255, 255, 255, 0.19)"}
      borderRadius="10px"
      id="addToolForm"
      p={"10px"}
      gap={4}
      border={"3px solid #ffffff45"}
    >
      <EmptyState.Root>
        <EmptyState.Content>
          <EmptyState.Indicator>
            <IoSadOutline color="black" />
          </EmptyState.Indicator>
          <VStack textAlign="center">
            <EmptyState.Title>No hay herramientas</EmptyState.Title>
            <EmptyState.Description justifyItems={"center"}>
              <Button
                onClick={() => {
                  setFromEmpty(true);
                  setOpenMenu(true);
                  if (path.pathname === "/adminpanel") {
                    setOpenAdmin(true);
                    setAddTool(true);
                  }
                  if (path.pathname === "/userpanel") {
                    setOpenUser(true);
                    setAddTool(true);
                  }
                }}
                variant={"plain"}
              >
                ¿Por que no agregas una?
                <FaRegSmileWink style={{ fontSize: "20px" }} />
              </Button>
            </EmptyState.Description>
          </VStack>
        </EmptyState.Content>
      </EmptyState.Root>
    </Stack>
  );
}

export default Empty;
