import { createContext } from "react";

type UserFormContext = {
  handleLogin: (email: string, password: string) => void;
  handleRegister: (email: string, password: string, name: string) => void;
  loading: boolean;
  success?: string;
  error?: string;
  admin?: boolean;
};

export default createContext<UserFormContext>({} as UserFormContext);
