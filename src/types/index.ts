import type { User } from "firebase/auth";
import type { FieldValue, Timestamp } from "firebase/firestore";

export type Tools = {
  approved: boolean;
  pending: boolean;
  article: string;
  brief: string;
  cats: string[];
  createdAt: Timestamp | FieldValue;
  createdBy: string;
  func: string;
  id: string;
  license: string;
  link: string;
  name: string;
  platform: string | string[];
  ratings: object;
};

export type OpenContext = {
  fromEmpty: boolean;
  setFromEmpty: (e: boolean) => void;
  openLog: boolean;
  setOpenLog: (e: boolean) => void;
  openReg: boolean;
  setOpenReg: (e: boolean) => void;
  openAdmin: boolean;
  setOpenAdmin: (e: boolean) => void;
  openUser: boolean;
  setOpenUser: (e: boolean) => void;
  openMenu: boolean;
  setOpenMenu: (e: boolean) => void;
  addCategory: boolean;
  setAddCategory: (e: boolean) => void;
  addTool: boolean;
  setAddTool: (e: boolean) => void;
  pendingTool: boolean;
  setPendingTool: (e: boolean) => void;
  currentTool: boolean;
  setCurrentTool: (e: boolean) => void;
};

export type Categories = {
  id: string;
  desc: string;
  name: string;
  createdAt: Timestamp;
  approved: boolean;
};

export type UserForm = {
  name?: string;
  email: string;
  password: string;
};

export type PropUserUid = {
  uid: string;
};

export type AuthStates = {
  isLoading: boolean;
  success: string;
  error: string;
};

export type UserFormContext = {
  handleLogin: (email: string, password: string) => void;
  handleRegister: (email: string, password: string, name: string) => void;
  currentUser: User | null;
  isAdmin: boolean | undefined;
  loginState: AuthStates;
  registerState: AuthStates;
  isLoadingAuth: boolean;
};

export type FormType = {
  firstName: string;
  password: string;
  email: string;
};
