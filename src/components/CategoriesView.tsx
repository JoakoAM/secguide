type Props = {};
import { useState } from "react";
import {
  fetchCategories,
  fetchTools,
  renderCategories,
} from "../firebasePath/firebase.tsx";
import { Card, SkeletonText, Stack } from "@chakra-ui/react";
import type { Categories, Tools } from "../types/index.ts";
//jsaKJLakjlaSJLK
const CategoriesView = ({}: Props) => {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [tools, setTools] = useState<Tools[]>([]);
  const [loading, setLoading] = useState(true);
  const loadingSkeleton = () => {
    const skeletons = [];
    for (let i = 1; i <= 12; i++) {
      skeletons.push(`skeleton${i}`);
    }
    return (
      <Stack
        justifyContent={"center"}
        gap="2"
        direction="row"
        wrap="wrap"
        id={`${Math.random()}`}
      >
        {skeletons.map((m) => (
          <Card.Root
            key={m}
            boxShadow={"0 10px 30px rgba(0, 0, 0, 0.2)"}
            color={"gray.300"}
            borderRadius="10px"
            marginTop="10px"
            w="486px"
            h="200px"
            overflow="hidden"
            margin={"14px"}
            transition=".3s"
            cursor={"pointer"}
            _hover={{
              transform: "translateY(-8px)",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Card.Body marginTop={"10px"} gap="2">
              <SkeletonText bg={"gray.600"} w="200px" noOfLines={1} />
              <SkeletonText bg={"gray.600"} w="100px" noOfLines={1} />
              <SkeletonText bg={"gray.600"} w="50px" noOfLines={1} />
            </Card.Body>
          </Card.Root>
        ))}
      </Stack>
    );
  };
  const loadPublicData = () => {
    fetchTools(setTools);
    fetchCategories(setCategories, setLoading);
  };

  if (loading) {
    loadPublicData();
    return loadingSkeleton();
  }
  return (
    <>
      <Stack justifyContent={"center"} gap="2" direction="row" wrap="wrap">
        <>{renderCategories(categories, tools)}</>
        <div id="toolsView" className="tools-grid"></div>
        <div id="toolDetailView"></div>
      </Stack>
    </>
  );
};
export default CategoriesView;
