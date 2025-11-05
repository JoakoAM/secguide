import DrawerLogin from "./DrawerLogin";
import DrawerRegister from "./DrawerRegister";
import UserFormProvider from "../../providers/UserFormProvider";
import NavHub from "../../components/NavHub";
type Props = {};

const Hub = ({}: Props) => {
  return (
    <>
      <NavHub>
        <DrawerLogin></DrawerLogin>
        <DrawerRegister></DrawerRegister>
      </NavHub>
    </>
  );
};

export default Hub;
