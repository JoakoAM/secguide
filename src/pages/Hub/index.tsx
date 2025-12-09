import { useState } from "react";
import DialogLogin from "./DialogLogin";
import DialogRegister from "./DialogRegister";
import useOpen from "../../contexts/OpenContext";
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
