import NavHub from "../../components/NavHub";
import LogOut from "../../components/LogOut";
import DialogPanelUser from "./DialogPanelUser";
import useAuth from "../../contexts/AuthContext";

type Props = {};

function HubUser({}: Props) {
  const { currentUser, isAdmin } = useAuth();
  console.log(currentUser, "isadmin", isAdmin);
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
