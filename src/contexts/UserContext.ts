import { createContext, type FormEvent } from "react";

type UserFormContext = {
  handleLogin: (e: FormEvent) => void;
  handleRegister: (e: FormEvent) => void;
  error: boolean;
  success: boolean;
  isAdmin: boolean;
};

export default createContext<UserFormContext>({} as UserFormContext);
