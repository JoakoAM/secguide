import { useQueries, useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebasePath/firebase";
import type { Tools } from "../types";

const queryTools = async () => {
  try {
    const snap = await getDocs(
      query(collection(db, "tools"), where("approved", "==", true))
    );
    return snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Tools[];
  } catch (error) {
    throw new Error("Error cargando tools");
  }
};

export default function useTools() {
  return useQuery({
    queryKey: ["tools"],
    queryFn: () => queryTools(),
  });
}
