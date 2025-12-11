import {
  Center,
  HStack,
  IconButton,
  Separator,
  Spinner,
  Stack,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoAlertOutline } from "react-icons/io5";
import { LuCircleAlert } from "react-icons/lu";
import { Tooltip } from "../../components/ui/tooltip";
import useUserTools from "../../hooks/useUserTools";
import type { Tools } from "../../types";
type Props = {};

function UserTools({}: Props) {
  const [mostrar, setMostrar] = useState(false);
  const { data: userTools, isLoading, isError } = useUserTools();
  useEffect(() => {
    let timeout: number;
    timeout = setTimeout(() => {
      setMostrar(true);
    }, 1500);
    () => {
      clearTimeout(timeout);
    };
  }, []);

  if (isLoading) {
    return (
      <Center mt={"20px"}>
        <Spinner w="70px" h="70px" />
      </Center>
    );
  }

  if (isError) {
    return <>Mensaje de error</>;
  }

  if (mostrar) {
    return (
      <>
        <Center>
          <h2>Tus herramientas</h2>
        </Center>
        <Stack
          animation="fade-in 0.5s ease-out"
          borderRadius="10px"
          p={"px"}
          gap={4}
        >
          {(userTools as Tools[]).map((t) => (
            <HStack
              bg={"rgba(255, 255, 255, 0.19)"}
              borderRadius="10px"
              p={"5px"}
              gap={4}
              key={t.id}
            >
              <span style={{ width: "55px", fontWeight: "bold" }}>
                {t.name}
              </span>
              <Separator
                borderColor={"rgba(0, 0, 0, 0.19)"}
                orientation="vertical"
                height="30px"
              />
              <span style={{ maxWidth: "291px", width: "291px" }}>
                {t.brief}
              </span>
              {t.approved && !t.pending ? (
                <Tooltip
                  showArrow
                  contentProps={{
                    css: { "--tooltip-bg": "rgba(66, 189, 78, 0.73)" },
                  }}
                  content="Aprobado"
                >
                  <IconButton
                    justifyItems={"center"}
                    bg={"rgba(10, 159, 25, 0.73)"}
                    _hover={{
                      bg: "rgba(66, 189, 78, 0.73)",
                    }}
                    rounded={"lg"}
                    margin={"5px"}
                    cursor={"none"}
                  >
                    <FaCheck />
                  </IconButton>
                </Tooltip>
              ) : (
                ""
              )}
              {t.pending && !t.approved ? (
                <Tooltip
                  showArrow
                  contentProps={{
                    css: { "--tooltip-bg": "rgba(255, 154, 3, 0.73)" },
                  }}
                  content="Pendiente"
                >
                  <IconButton
                    justifyItems={"center"}
                    bg={"rgba(255, 154, 3, 0.73)"}
                    _hover={{
                      bg: "rgba(246, 186, 97, 0.73)",
                    }}
                    rounded={"lg"}
                    margin={"5px"}
                    cursor={"none"}
                  >
                    <LuCircleAlert />
                  </IconButton>
                </Tooltip>
              ) : (
                ""
              )}
              {!t.approved && !t.pending ? (
                <Tooltip
                  showArrow
                  contentProps={{
                    css: { "--tooltip-bg": "rgba(255, 13, 0, 0.73)" },
                  }}
                  content="Rechazada"
                >
                  <IconButton
                    justifyItems={"center"}
                    bg={"rgba(255, 13, 0, 0.73)"}
                    _hover={{
                      bg: "rgba(236, 97, 89, 0.73)",
                    }}
                    rounded={"lg"}
                    margin={"5px"}
                    cursor={"none"}
                  >
                    <IoAlertOutline />
                  </IconButton>
                </Tooltip>
              ) : (
                ""
              )}
            </HStack>
          ))}
        </Stack>
      </>
    );
  }
  return (
    <Center mt={"20px"}>
      <Spinner w="70px" h="70px" />
    </Center>
  );
}

export default UserTools;
