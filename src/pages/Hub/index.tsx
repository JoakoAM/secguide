import { Center, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../contexts/AuthContext";
import DialogLogin from "./DialogLogin";
import DialogRegister from "./DialogRegister";
type Props = {};

const Hub = ({}: Props) => {
  const nav = useNavigate();
  const { currentUser, isAdmin, isLoadingAuth } = useAuth();

  useEffect(() => {
    if (!isLoadingAuth && currentUser != null) {
      const timeout = setTimeout(() => {
        if (isAdmin) {
          nav("adminpanel");
        } else {
          nav("userpanel");
        }
      }, 2500);

      return () => clearTimeout(timeout);
    }
  }, [isLoadingAuth, currentUser, isAdmin]);

  return (
    <>
      <DialogLogin />
      <DialogRegister />
    </>
  );
};

export default Hub;
