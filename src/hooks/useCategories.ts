import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebasePath/firebase";
import type { Categories } from "../types";

const queryCategories = async () => {
  const categoriesRef = collection(db, "categories");
  const categoriesQuery = query(categoriesRef, where("approved", "==", true));

  const querySnapshot = await getDocs(categoriesQuery);
  const categoriesData: Categories[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Categories[];

  return categoriesData.sort(
    (a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()
  );
};

export default function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => queryCategories(),
  });
}
