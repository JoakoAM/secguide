import DialogPanelAdmin from "./DialogPanelAdmin";
import LogOut from "../../components/LogOut";

type Props = {};

function HubAdmin({}: Props) {
  return (
    <>
      <DialogPanelAdmin />
      <LogOut />
    </>
  );
}

export default HubAdmin;
