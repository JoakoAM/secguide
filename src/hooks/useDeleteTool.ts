import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebasePath/firebase";
import type { Tools } from "../types";

const queryDeleteToold = async (tool: Tools) => {
  try {
    const toolsRef = doc(db, "tools", tool.id);
    await deleteDoc(toolsRef);
  } catch (e) {
    throw new Error("Ha ocurrido un error eliminado la herramienta. ");
  }
};

export default function usedeleteTool() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (tool: Tools) => queryDeleteToold(tool),
    onMutate: (deletedTool) => {
      const oldPendingTools = queryClient.getQueryData<Tools[]>([
        "pendingTools",
      ]);
      queryClient.setQueryData<Tools[]>(["pendingTools"], (tools = []) =>
        tools.filter((tool) => tool.id !== deletedTool.id)
      );
      return oldPendingTools;
    },
    onError: (_, __, ctx) => {
      queryClient.setQueryData<Tools[]>(["pendingTools"], ctx);
      console.log("ERROR");
    },
  });
}
