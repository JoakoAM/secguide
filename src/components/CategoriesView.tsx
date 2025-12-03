type Props = {};
import {
  Card,
  CardDescription,
  CloseButton,
  Dialog,
  HStack,
  Portal,
  Separator,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useLocation } from "react-router";
import useCategories from "../hooks/useCategories.ts";
import useTools from "../hooks/useTools.ts";
import type { Categories, Tools } from "../types/index.ts";
import styles from "../styles/CategoriesView.module.css";
import stylesDialog from "../styles/Dialog.module.css";

type selectedCatType = {
  idx: number;
  tools: Tools[];
};

const CategoriesView = ({}: Props) => {
  const [Tools] = useTools();
  const [open, setOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState<selectedCatType>();

  const renderCategories = (c: Categories[], t: Tools[]) => {
    if (c.length === 0) {
      //Mensaje de er
      <p style={{ color: "white" }}>No hay categorías disponibles</p>;
      return;
    }
    const render = c.map((cat, idx) => {
      const count = t.filter((t) => t.cats && t.cats.includes(cat.id)).length;
      const selectedTools = t.filter((t) => t.cats[0] === cat.id);
      return (
        <Dialog.Trigger key={cat.id} asChild>
          <Card.Root
            className={styles.CardRoot}
            onClick={() => {
              setOpen(true);
              setSelectedCat({ idx, tools: selectedTools });
              console.log(selectedCat);
            }}
          >
            <Card.Body gap="2">
              <Card.Title className={styles.CardTitle}>{cat.name}</Card.Title>
              <Card.Description className={styles.CardDescriptionDesc}>
                {cat.desc}
              </Card.Description>
              <Card.Description className={styles.CardDescriptionCount}>
                {count} herramienta{count !== 1 ? "s" : ""}
              </Card.Description>
            </Card.Body>
          </Card.Root>
        </Dialog.Trigger>
      );
    });
    return render;
  };
  const path = useLocation();
  const {
    data: categories,
    error: errorCategories,
    isLoading: isLoadingCategories,
  } = useCategories();

  const { data: tools, error: errorTools, isLoading: isLoadingTools } = Tools;

  if (errorTools || errorCategories) {
    return;
  }
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
        key={path.pathname}
        animation="fade-out 2s ease-out"
      >
        {skeletons.map((m) => (
          <Card.Root className={styles.SkeletonCard}>
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
  if (isLoadingTools || isLoadingCategories) {
    return loadingSkeleton();
  }
  if (categories && tools) {
    return (
      <>
        <Stack
          key={path.pathname}
          animation="fade-in 2s ease-out"
          justifyContent={"center"}
          gap="2"
          direction="row"
          wrap="wrap"
        >
          <Dialog.Root
            lazyMount
            placement={"top"}
            open={open}
            onOpenChange={(e) => setOpen(e.open)}
          >
            <>{renderCategories(categories, tools)}</>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content className={stylesDialog.content}>
                  <Dialog.Header>
                    <Dialog.Title>
                      {selectedCat ? categories[selectedCat.idx].name : ""}
                    </Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    {selectedCat
                      ? selectedCat.tools.length === 0
                        ? "No hay herramientas"
                        : selectedCat.tools.map((t) => (
                            <Stack key={t.id} borderRadius="10px" gap={4}>
                              <HStack
                                border={"1px solid rgba(255, 255, 255, 0.21)"}
                                bg={"rgba(255, 255, 255, 0.19)"}
                                borderRadius="10px"
                                p={"5px"}
                                gap={4}
                                scale={1.2}
                                _hover={{ scale: 1.25 }}
                                transition={"1s"}
                                cursor={"pointer"}
                              >
                                <span
                                  style={{ width: "55px", fontWeight: "bold" }}
                                >
                                  {t.name}
                                </span>
                                <Separator
                                  borderColor={"rgba(0, 0, 0, 0.19)"}
                                  orientation="vertical"
                                  height="30px"
                                />
                                <span
                                  style={{ maxWidth: "291px", width: "291px" }}
                                >
                                  {t.brief}
                                </span>
                              </HStack>
                            </Stack>
                          ))
                      : ""}
                  </Dialog.Body>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton
                      _hover={{ bg: "rgba(255, 255, 255, 0.2)" }}
                      borderRadius={"10px"}
                      variant={"plain"}
                    />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>

          <div id="toolsView" className="tools-grid"></div>
          <div id="toolDetailView"></div>
        </Stack>
      </>
    );
  }
};
export default CategoriesView;
