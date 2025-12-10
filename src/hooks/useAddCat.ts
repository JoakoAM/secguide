import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebasePath/firebase";
import type { Categories } from "../types";

export const queryAddCat = async (cat: Categories) => {
  try {
    const ref = collection(db, "categories");
    addDoc(ref, {
      ...cat,
      createdAt: serverTimestamp(),
    });
  } catch (e) {
    throw new Error("Ha ocurrido un error creando la categoria.");
  }
};

export default function useAddCat() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cat: Categories) => queryAddCat(cat),
    onMutate: (newCat) => {
      const oldCat = queryClient.getQueryData<Categories[]>(["categories"]);
      queryClient.setQueryData<Categories[]>(["categories"], (cat = []) => [
        newCat,
        ...cat,
      ]);
      return { oldCat };
    },
    onError: (_, __, ctx) => {
      queryClient.setQueryData<Categories[]>(["categories"], ctx?.oldCat);
    },
  });
}
