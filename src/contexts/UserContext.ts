import { createContext, type FormEvent } from "react";

type UserFormContext = {
  handleLogin: (e: FormEvent) => void;
  handleRegister: (e: FormEvent) => void;
  handleLogOut: (a: boolean) => void;
  error: boolean;
  success: boolean;
  isAdmin: boolean;
  logged: boolean;
};

export default createContext<UserFormContext>({} as UserFormContext);
