import NavHub from "../../components/NavHub";
import DrawerPanel from "./DrawerPanel";
import LogOut from "../../components/LogOut";

type Props = {};

function HubUser({}: Props) {
  return (
    <>
      <NavHub>
        <LogOut />
        <DrawerPanel></DrawerPanel>
      </NavHub>
    </>
  );
}

export default HubUser;
