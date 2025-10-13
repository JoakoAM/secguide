import type { Timestamp } from "firebase/firestore";

export type Tools = {
  approved: boolean;
  article: string;
  brief: string;
  cats: string[];
  createdAt: Timestamp;
  createdBy: string;
  func: string;
  id: string;
  license: string;
  link: string;
  name: string;
  platform: string;
  ratings: object;
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
