import { Button } from "@chakra-ui/react";
import NavHub from "../../components/NavHub";
import { auth } from "../../firebasePath/firebase";
import DialogPanelAdmin from "./DialogPanelAdmin";
import LogOut from "../../components/LogOut";
import useUser from "../../hooks/useUser";

type Props = {};

function HubAdmin({}: Props) {
  return (
    <>
      <NavHub>
        <DialogPanelAdmin></DialogPanelAdmin>
        <LogOut />
      </NavHub>
    </>
  );
}

export default HubAdmin;
