import { Button, CloseButton, Dialog, Text, Portal } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebasePath/firebase";
// import useUser from "../hooks/useUser";

type Props = {};

export default function DrawerPanel({}: Props) {
  const nav = useNavigate();
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        const isAdmin = userDoc.get("isAdmin");
        if (isAdmin) {
          return nav("/adminpanel");
        } else {
          return nav("/userpanel");
        }
      }
    });
  };
  fetchUserData();
  return (
    <>
      <Dialog.Root placement="center" motionPreset="slide-in-bottom">
        <Dialog.Trigger asChild>
          <Button
            variant={"plain"}
            borderRadius={"10px"}
            _hover={{
              bg: "rgba(255, 255, 255, 0.2)",
            }}
          >
            👤 Mi Panel
          </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content
              bg={"rgba(255, 255, 255, 0.2)"}
              backdropFilter={"blur(10px)"}
              border={"1px solid rgba(255, 255, 255, 0.3)"}

            >
              <Dialog.Header>
                <Dialog.Title>Panel de usuario</Dialog.Title>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Header>
              <Dialog.Body>
                <Button marginBottom={"20px"}>Sugerir herramienta</Button>

                <h2>Herramientas sugeridas</h2>
                <Text>No hay herramientas sugeridas</Text>
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
}
