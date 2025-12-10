import {
  Alert,
  Button,
  Center,
  CloseButton,
  Dialog,
  HStack,
  Portal,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import useAuth from "../../contexts/AuthContext";
import useOpen from "../../contexts/OpenContext";
import stylesDialog from "../../styles/Dialog.module.css";
import LoginForm from "./LoginForm";
import { useEffect } from "react";
import { FaRegSmileWink } from "react-icons/fa";
type Props = {};

export default function DialogLogin({}: Props) {
  const { loginState, currentUser } = useAuth();
  const { fromEmpty, openLog, setOpenLog, setOpenReg, setFromEmpty } =
    useOpen();
  useEffect(() => {
    if (fromEmpty) {
      setOpenLog(true);
    }
  }, [fromEmpty]);

  return (
    <Dialog.Root
      closeOnInteractOutside={false}
      placement={{ sm: "bottom", md: "center" }}
      open={openLog}
      onOpenChange={(e) => {
        setOpenLog(e.open);
        if (!openLog) {
          setFromEmpty(false);
        }
      }}
    >
      <Dialog.Trigger asChild>
        <Button
          variant={"plain"}
          animation="fade-in 0.5s ease-out"
          className={stylesDialog.btnTrigger}
        >
          🔐 Iniciar Sesión
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            animation={"fade-in 0.5s ease-out"}
            className={stylesDialog.content}
          >
            <Dialog.Header alignSelf={"center"}>
              <Dialog.Title
                animation="fade-in 0.5s ease-out"
                key={loginState.success ? "success" : "title"}
              >
                {loginState.success && !loginState.isLoading
                  ? loginState.success
                  : "Iniciar sesión"}
              </Dialog.Title>
            </Dialog.Header>

            <Dialog.Body pb="4">
              {(loginState.isLoading && loginState.success) || currentUser ? (
                <Center>
                  <Spinner size={"xl"} />
                </Center>
              ) : (
                <>
                  {fromEmpty ? (
                    <Alert.Root
                      animation={"pulse 2s ease-out"}
                      mb={"5px"}
                      status="error"
                      key={`${fromEmpty}`}
                      border={"1px solid red"}
                    >
                      <Alert.Indicator />
                      <Alert.Content>
                        <Alert.Title>
                          <HStack>
                            Primero debes iniciar sesión o crear una cuenta
                            <FaRegSmileWink style={{ fontSize: "20px" }} />
                          </HStack>
                        </Alert.Title>
                        <Alert.Description />
                      </Alert.Content>
                    </Alert.Root>
                  ) : (
                    ""
                  )}
                  <LoginForm />
                  <Button
                    onClick={() => {
                      setOpenLog(false);
                      setOpenReg(true);
                    }}
                    mt={"10px"}
                    w={"auto"}
                    h="auto"
                    variant={"plain"}
                  >
                    ¿No tienes cuenta?. Regístrate aquí
                  </Button>
                </>
              )}
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton className={stylesDialog.btnClose} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
