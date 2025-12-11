import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Tools } from "../types";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebasePath/firebase";
import useAuth from "../contexts/AuthContext";
import type { User } from "firebase/auth";

const queryAddTool = async (tool: Tools, currentUser: User) => {
  try {
    if (!currentUser) {
      throw new Error("No ha iniciado sesión");
    }
    const ref = collection(db, "tools");
    await addDoc(ref, {
      ...tool,
      createdAt: serverTimestamp(),
      createdBy: currentUser.uid,
      approved: false,
      pending: true,
    });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export default function useAddTool() {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addTools"],
    mutationFn: (tool: Tools) => {
      if (!currentUser) {
        throw new Error("No ha iniciado sesión");
      }
      return queryAddTool(tool, currentUser);
    },
    onMutate: (newTool) => {
      const oldTools = queryClient.getQueryData<Tools[]>(["userTools"]);
      queryClient.setQueryData<Tools[]>(["userTools"], (old = []) => [
        newTool,
        ...old,
      ]);

      return oldTools;
    },
    onError: (e, __, ctx) => {
      queryClient.setQueryData<Tools[]>(["userTools"], ctx);
      return e;
    },
  });
}
