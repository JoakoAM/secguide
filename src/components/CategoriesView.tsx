type Props = {};
import {
  Box,
  Card,
  CloseButton,
  Container,
  Dialog,
  Flex,
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
import stylesCard from "../styles/Card.module.css";
import stylesDialog from "../styles/Dialog.module.css";
import stylesSkeleton from "../styles/Skeleton.module.css";
import type { Categories, Tools } from "../types/index.ts";
import Empty from "./Empty.tsx";
import { set } from "react-hook-form";

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
      //Mensaje de error
      <p style={{ color: "white" }}>No hay categorías disponibles</p>;
      return;
    }
    const render = c.map((cat, idx) => {
      const count = t.filter((t) => t.cats && t.cats.includes(cat.id)).length;
      const selectedTools = t.filter((t) => t.cats[0] === cat.id);
      return (
        <Dialog.ActionTrigger key={cat.id}>
          <Card.Root
            border={"none"}
            onClick={() => {
              setOpen(true);
              setSelectedCat({ idx, tools: selectedTools });
            }}
            className={stylesCard.root}
          >
            <Card.Body className={stylesCard.body}>
              <Card.Title className={stylesCard.title}>{cat.name}</Card.Title>
              <Card.Description className={stylesCard.descriptionDesc}>
                {cat.desc}
              </Card.Description>
              <Card.Description className={stylesCard.descriptionCount}>
                {count} herramienta{count !== 1 ? "s" : ""}
              </Card.Description>
            </Card.Body>
          </Card.Root>
        </Dialog.ActionTrigger>
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
      >
        {skeletons.map((_, idx) => (
          <Card.Root className={stylesSkeleton.card} key={idx * 3123}>
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
                    <Stack
                      bg={"rgba(255, 255, 255, 0.19)"}
                      borderRadius="10px"
                      id="addToolForm"
                      border={"3px solid #ffffff45"}
                      p={"10px"}
                      gap={4}
                    >
                      <Dialog.Title>
                        {selectedCat ? categories[selectedCat.idx].name : ""}
                      </Dialog.Title>
                    </Stack>
                  </Dialog.Header>
                  <Dialog.Body>
                    {selectedCat ? (
                      selectedCat.tools.length === 0 ? (
                        <Empty setOpenParent={setOpen} />
                      ) : (
                        selectedCat.tools.map((t) => (
                          <>
                            <Dialog.Root key={t.id}>
                              <Dialog.Trigger asChild>
                                <Stack borderRadius="10px" gap={4}>
                                  <HStack className={stylesDialog.hStack}>
                                    <span
                                      className={stylesDialog.hStackSpanName}
                                    >
                                      {t.name}
                                    </span>
                                    <Separator
                                      borderColor={"rgba(0, 0, 0, 0.19)"}
                                      orientation="vertical"
                                      height="30px"
                                    />
                                    <span
                                      className={stylesDialog.hStackSpanBrief}
                                    >
                                      {t.brief}
                                    </span>
                                  </HStack>
                                </Stack>
                              </Dialog.Trigger>
                              <Portal>
                                <Dialog.Backdrop />
                                <Dialog.Positioner>
                                  <Dialog.Content
                                    className={stylesDialog.content}
                                  >
                                    <Dialog.Header>
                                      <Dialog.Title>{t.name}</Dialog.Title>
                                    </Dialog.Header>
                                    <Dialog.Body>{t.article}</Dialog.Body>
                                  </Dialog.Content>
                                </Dialog.Positioner>
                              </Portal>
                            </Dialog.Root>
                          </>
                        ))
                      )
                    ) : (
                      ""
                    )}
                  </Dialog.Body>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton
                      className={stylesDialog.btnTrigger}
                      variant={"plain"}
                    />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
        </Stack>
      </>
    );
  }
};
export default CategoriesView;
