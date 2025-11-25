import { Center, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import NavHub from "../../components/NavHub";
import DialogLogin from "./DialogLogin";
import DialogRegister from "./DialogRegister";
type Props = {};

const Hub = ({}: Props) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let timeout: number;
    timeout = setTimeout(() => {
      setLoading(false);
    }, 4000);

    () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <NavHub>
        {!loading ? (
          <>
            <DialogLogin />
            <DialogRegister />
          </>
        ) : (
          <Center>
            <Spinner />
          </Center>
        )}
      </NavHub>
    </>
  );
};

export default Hub;
