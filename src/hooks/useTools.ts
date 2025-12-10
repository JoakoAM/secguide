import { useQueries } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebasePath/firebase";
import type { Tools } from "../types";

const queryTools = async () => {
  const toolsRef = collection(db, "tools");
  const toolsQuery = query(toolsRef, where("approved", "==", true));
  const querySnapshot = await getDocs(toolsQuery);
  const tools: Tools[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Tools[];
  return tools;
};

const queryPendingTools = async () => {
  const toolsRef = collection(db, "tools");
  const toolsQuery = query(toolsRef, where("approved", "==", false));
  const querySnapshot = await getDocs(toolsQuery);
  const toolsPending: Tools[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Tools[];
  return toolsPending;
};
{
  ("por alguna razon esta wea no esta funcionaaaaadooojasdolkfgdssweoipjfep");
}

export default function useTools() {
  return useQueries({
    queries: [
      {
        queryKey: ["tools"],
        queryFn: () => queryTools(),
        staleTime: 1000 * 60 * 10, // 10 minutos
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
      },
      {
        queryKey: ["pendingTools"],
        queryFn: () => queryPendingTools(),
      },
    ],
  });
}
