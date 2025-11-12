import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebasePath/firebase";
import type { Tools } from "../types";

export const queryAproveTool = async (tool: Tools) => {
  try {
    const toolsRef = doc(db, "tools", tool.id);
    await updateDoc(toolsRef, {
      approved: true,
    });
  } catch (e) {
    throw new Error("Ha ocurrido un error aprobando la herramienta.");
  }
};

export default function useAproveTool() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (tool: Tools) => queryAproveTool(tool),
    onMutate: (AprovedTool) => {
      const oldPendingTools = queryClient.getQueryData<Tools[]>([
        "toolsPending",
      ]);
      const oldTools = queryClient.getQueryData<Tools[]>(["tools"]);
      queryClient.setQueryData<Tools[]>(["toolsPending"], (tools = []) =>
        tools.filter((tool) => tool.id !== AprovedTool.id)
      );
      queryClient.setQueryData<Tools[]>(["tools"], (tools = []) => [
        AprovedTool,
        ...tools,
      ]);
      return { oldPendingTools, oldTools };
    },
    onError: (_, __, ctx) => {
      queryClient.setQueryData<Tools[]>(["toolsPending"], ctx?.oldPendingTools);
      queryClient.setQueryData<Tools[]>(["toolsPending"], ctx?.oldTools);
    },
  });
}
