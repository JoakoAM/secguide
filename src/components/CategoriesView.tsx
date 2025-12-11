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
import { FaShieldAlt, FaShieldVirus, FaUserSecret } from "react-icons/fa";
import {
  MdMemory,
  MdOutlineVpnLock,
  MdScience,
  MdTrackChanges,
  MdWifiPassword,
} from "react-icons/md";
import { HiOutlineDocumentReport, HiOutlineShieldCheck } from "react-icons/hi";
import {
  RiGlobalLine,
  RiLockPasswordLine,
  RiTerminalLine,
} from "react-icons/ri";

type selectedCatType = {
  idx: number;
  tools: Tools[];
};

const CategoriesView = ({}: Props) => {
  const path = useLocation();
  const {
    data: categories,
    error: errorCategories,
    isLoading: isLoadingCategories,
  } = useCategories();
  console.log(categories);
  const {
    data: tools,
    isError: errorTools,
    isLoading: isLoadingTools,
  } = useTools();
  const [openParent, setOpenParent] = useState(false);
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
        <Card.Root
          key={cat.id}
          border={"none"}
          onClick={() => {
            setOpenParent(true);
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

            <Stack
              position={"absolute"}
              left={"-10px"}
              fontSize={"70px"}
              w={"100%"}
              alignItems={"flex-end"}
            >
              {cat.id === "ttScC1m8pNXwgxAZkz9q" ? <MdScience /> : ""}
              {cat.id === "tGYcWd4hxFD9ORBurapT" ? <MdOutlineVpnLock /> : ""}
              {cat.id === "CZ4Ew7Q52yshUgoZSDbf" ? <FaUserSecret /> : ""}
              {cat.id === "6tfhZMI7GDKPzjLWQ9rx" ? <MdMemory /> : ""}
              {cat.id === "2EkeVpknRwbZUkiB1MBv" ? (
                <HiOutlineDocumentReport />
              ) : (
                ""
              )}
              {cat.id === "Ec1jTAjDhSnIDuRSmQpW" ? <FaShieldVirus /> : ""}

              {cat.id === "Nm681zb79HnwtVCBNVPh" ? <RiLockPasswordLine /> : ""}
              {cat.id === "aKnL5iwZJyJZ4X66lNYI" ? <MdWifiPassword /> : ""}
              {cat.id === "SUKKU2rjLFUPtWVCqTA1" ? (
                <HiOutlineShieldCheck />
              ) : (
                ""
              )}
              {cat.id === "nmwAQsuF6OHFpG8OET7v" ? <RiTerminalLine /> : ""}
              {cat.id === "9WI9eN6GyW7ggKlcjT8b" ? <FaShieldAlt /> : ""}
              {cat.id === "ZW281HGf24SQtxsWQ3dy" ? <MdTrackChanges /> : ""}
              {cat.id === "BJ7rxydu32Z3l8crLCXA" ? <RiGlobalLine /> : ""}
            </Stack>
          </Card.Body>
        </Card.Root>
      );
    });
    return render;
  };

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
            open={openParent}
            onOpenChange={(e) => setOpenParent(e.open)}
          >
            <>{renderCategories(categories, tools)}</>

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
                      <Empty />
                    ) : (
                      selectedCat.tools.map((t) => (
                        <>
                          <Dialog.Root key={t.id}>
                            <Dialog.Trigger asChild>
                              <Stack borderRadius="10px" gap={4}>
                                <HStack className={stylesDialog.hStack}>
                                  <span className={stylesDialog.hStackSpanName}>
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
          </Dialog.Root>
        </Stack>
      </>
    );
  }
};
export default CategoriesView;
