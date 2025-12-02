import { Center, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import NavHub from "../../components/NavHub";
import DialogLogin from "./DialogLogin";
import DialogRegister from "./DialogRegister";
import useAuth from "../../contexts/AuthContext";
import { useNavigate } from "react-router";
type Props = {};

const Hub = ({}: Props) => {
  const nav = useNavigate();
  const [spinner, setSpinner] = useState(true);
  const { currentUser, isAdmin, isLoadingAuth } = useAuth();
  useEffect(() => {
    let timeout: number;
    timeout = setTimeout(() => {
      setSpinner(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (!isLoadingAuth && !spinner && currentUser != null) {
      const timeout = setTimeout(() => {
        if (isAdmin) {
          nav("adminpanel");
        } else {
          nav("userpanel");
        }
      }, 2500);

      return () => clearTimeout(timeout);
    }
  }, [isLoadingAuth, spinner, currentUser, isAdmin]);

  return (
    <>
      <NavHub>
        {!spinner ? (
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
