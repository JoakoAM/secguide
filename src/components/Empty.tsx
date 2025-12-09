import { Button, EmptyState, Stack, VStack } from "@chakra-ui/react";
import { FaRegSmileWink } from "react-icons/fa";
import { IoSadOutline } from "react-icons/io5";
import { useLocation } from "react-router";
import useOpen from "../contexts/OpenContext";
type Props = {
  setOpenParent: (e: boolean) => void;
};

function Empty({ setOpenParent }: Props) {
  const {
    setFromEmpty,
    setOpenLog,
    setOpenAdmin,
    setOpenUser,
    setOpenMenu,
    setAddTool,
  } = useOpen();
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
                  if (path.pathname === "/adminpanel") {
                    setOpenParent(false);
                    setOpenMenu(true);
                    setOpenAdmin(true);
                    setAddTool(true);
                  }
                  if (path.pathname === "/userpanel") {
                    setOpenParent(false);
                    setOpenMenu(true);
                    setOpenUser(true);
                    setAddTool(true);
                  }
                  setOpenMenu(true);
                  setFromEmpty(true);
                  setOpenLog(true);
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
