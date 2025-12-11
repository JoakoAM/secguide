import { useQuery } from "@tanstack/react-query";
import type { User } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import useAuth from "../contexts/AuthContext";
import { db } from "../firebasePath/firebase";
import type { Tools } from "../types";

const queryUserTools = async (currentUser: User) => {
  if (!currentUser) return;
  try {
    const snap = await getDocs(
      query(collection(db, "tools"), where("createdBy", "==", currentUser.uid))
    );
    return snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Tools[];
  } catch (e) {
    throw new Error("Error cargando sus herramientas :(");
  }
};

export default function useUserTools() {
  const { currentUser } = useAuth();
  return useQuery({
    queryKey: ["userTools"],
    queryFn: () => queryUserTools(currentUser as User),
  });
}
