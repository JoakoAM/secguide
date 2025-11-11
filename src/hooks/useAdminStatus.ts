import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebasePath/firebase";

const queryAdmin = async () => {
  if (!auth.currentUser) {
    return false;
  }
  const userRef = doc(db, "users", auth.currentUser.uid);
  const userDoc = await getDoc(userRef);
  const isAdmin: boolean = userDoc.get("isAdmin");
  return isAdmin as boolean;
};

export default function useAdminStatus() {
  return useQuery({
    queryKey: ["isAdmin"],
    queryFn: () => queryAdmin(),
  });
}
