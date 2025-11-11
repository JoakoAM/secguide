import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router";
import NavHub from "../../components/NavHub";
import { auth, db } from "../../firebasePath/firebase";
import DialogLogin from "./DialogLogin";
import DialogRegister from "./DialogRegister";
import { useEffect } from "react";
type Props = {};

const Hub = ({}: Props) => {
  const nav = useNavigate();
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        const isAdmin = userDoc.get("isAdmin");
        if (isAdmin) {
          return nav("/adminpanel");
        } else {
          return nav("/userpanel");
        }
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <NavHub>
        <DialogLogin />
        <DialogRegister />
      </NavHub>
    </>
  );
};

export default Hub;
