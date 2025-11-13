import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useLocation } from "react-router";
import { auth, db } from "../firebasePath/firebase";

export default function useUserStatus() {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isOnline, setOnline] = useState<boolean>(false);
  const location = useLocation();

  const checkUserStatus = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        if (location.pathname === "/userpanel") {
          setOnline(true);
          setLoading(false);
          return;
        }
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        const admin = userDoc.get("isAdmin");
        setIsAdmin(admin);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  };
  if (isLoading) {
    checkUserStatus();
  }
  return { isLoading, isAdmin, isOnline };
}
