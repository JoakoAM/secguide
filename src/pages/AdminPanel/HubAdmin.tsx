import NavHub from "../../components/NavHub";
import DialogPanelAdmin from "./DialogPanelAdmin";
import LogOut from "../../components/LogOut";
import useAuth from "../../contexts/AuthContext";

type Props = {};

function HubAdmin({}: Props) {
  const { currentUser } = useAuth();
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
