import { Grid, GridItem } from "@chakra-ui/react";
import CategoriesView from "../../components/CategoriesView";

type Props = {};

const Hub = ({}: Props) => {
  return (
    <>
      <Grid
        font={"caption"}
        bg="gray.100"
        templateAreas={`"header header" "main main"`}
        templateRows="80px 1fr"
        templateColumns={{ sm: `0 1fr`, md: `320px 1fr` }}
      >
        <GridItem
          boxShadow={"0px 0px 11px 10px"}
          color={"gray.200"}
          bg={"white"}
          alignItems={"center"}
          pl={2}
          area={"header"}
          position={"sticky"}
          top="0px"
          zIndex={1}
        ></GridItem>
        <GridItem pl={2} area={"main"} gap="1">
          <CategoriesView></CategoriesView>
        </GridItem>
      </Grid>
    </>
  );
};

export default Hub;
