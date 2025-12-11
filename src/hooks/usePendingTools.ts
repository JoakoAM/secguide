import { useQuery } from "@tanstack/react-query";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebasePath/firebase";
import type { Tools } from "../types";
import type { User } from "firebase/auth";
import useAuth from "../contexts/AuthContext";

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
    throw new Error((e as Error).message);
  }
};

export default function useUserTools() {
  const { currentUser } = useAuth();
  return useQuery({
    queryKey: ["userTools"],
    queryFn: () => queryUserTools(currentUser as User),
  });
}
