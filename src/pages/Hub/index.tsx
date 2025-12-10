import DialogLogin from "./DialogLogin";
import DialogRegister from "./DialogRegister";
type Props = {};

const Hub = ({}: Props) => {
  return (
    <>
      <DialogLogin />
      <DialogRegister />
    </>
  );
};

export default Hub;
