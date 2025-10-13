
type Props = {
  isAdmin: boolean;
};

const AdminPanel = ({ isAdmin }: Props) => {
  isAdmin ? "" : "";
  return <>{/* mostrar panel de administracion */}</>;
};

export default AdminPanel;
