import LogOut from "../../components/LogOut";
import DialogPanelUser from "./DialogPanelUser";

type Props = {};

function HubUser({}: Props) {
  return (
    <>
      <DialogPanelUser />
      <LogOut />
    </>
  );
}

export default HubUser;
