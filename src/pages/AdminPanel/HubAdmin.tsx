import { Button } from "@chakra-ui/react";
import NavHub from "../../components/NavHub";
import { auth } from "../../firebasePath/firebase";
import DialogPanelAdmin from "./DialogPanelAdmin";
import LogOut from "../../components/LogOut";

type Props = {};

function HubAdmin({}: Props) {
  return (
    <>
      <NavHub>
        <>
          <LogOut />
          <DialogPanelAdmin></DialogPanelAdmin>
        </>
      </NavHub>
    </>
  );
}

export default HubAdmin;
