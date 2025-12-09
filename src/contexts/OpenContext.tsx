import React, { useContext, useState, type ReactNode } from "react";
import type { OpenContext } from "../types";

type Props = {
  children: ReactNode;
};

const OpenContext = React.createContext<OpenContext>({} as OpenContext);

export default function useOpen() {
  return useContext(OpenContext);
}

export function OpenProvider({ children }: Props) {
  const [openAdmin, setOpenAdmin] = useState<boolean>(false);
  const [openUser, setOpenUser] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [addCategory, setAddCategory] = useState<boolean>(false);
  const [addTool, setAddTool] = useState<boolean>(false);
  const [pendingTool, setPendingTool] = useState<boolean>(false);
  const [currentTool, setCurrentTool] = useState<boolean>(false);
  const [openLog, setOpenLog] = useState(false);
  const [openReg, setOpenReg] = useState(false);
  const [fromEmpty, setFromEmpty] = useState(false);

  return (
    <OpenContext.Provider
      value={{
        fromEmpty,
        setFromEmpty,
        openLog,
        setOpenLog,
        openReg,
        setOpenReg,
        openAdmin,
        setOpenAdmin,
        openUser,
        setOpenUser,
        openMenu,
        setOpenMenu,
        addCategory,
        setAddCategory,
        addTool,
        setAddTool,
        pendingTool,
        setPendingTool,
        currentTool,
        setCurrentTool,
      }}
    >
      {children}
    </OpenContext.Provider>
  );
}
