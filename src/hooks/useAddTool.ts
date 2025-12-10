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
    addDoc(ref, {
      ...tool,
      createdAt: serverTimestamp(),
      createdBy: currentUser.uid,
      approved: false,
    });
    console.log("EXITOOOOOO");
  } catch (e) {
    console.log(e);
    throw new Error("Ha ocurrido un error creando la herramienta.");
  }
};

export default function useAddTool() {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (tool: Tools) => {
      if (currentUser) queryAddTool(tool, currentUser);
      throw new Error("Ha ocurrido un error creando la herramienta.");
    },
    onMutate: (newTool) => {
      const oldPendingTools = queryClient.getQueryData<Tools[]>([
        "pendingTools",
      ]);
      queryClient.setQueryData<Tools[]>(["pendingTools"], (tool = []) => [
        newTool,
        ...tool,
      ]);

      return { oldPendingTools };
    },
    onError: (e, __, ctx) => {
      queryClient.setQueryData<Tools[]>(["pendingTools"], ctx?.oldPendingTools);
      console.log(e);
      return e;
    },
  });
}
