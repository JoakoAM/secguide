import NavHub from "../../components/NavHub";
import LogOut from "../../components/LogOut";
import DialogPanelUser from "./DialogPanelUser";

type Props = {};

function HubUser({}: Props) {
  return (
    <>
      <NavHub>
        <DialogPanelUser></DialogPanelUser>
        <LogOut />
      </NavHub>
    </>
  );
}

export default HubUser;
