import Hub from "../Hub";
import { checkAdminStatus } from "../../components/firebase";

type Props = {
  isAdmin: boolean;
};

const AdminPanel = ({ isAdmin }: Props) => {
  isAdmin ? "" : "";
  return (
    <>
      <Hub></Hub>
      {/* mostrar panel de administracion */}
    </>
  );
};

export default AdminPanel;
