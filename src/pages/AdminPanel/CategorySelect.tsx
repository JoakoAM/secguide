import { Select, createListCollection } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { Categories } from "../../types";

type Props = {};

function CategorySelect({}: Props) {
  const [value, setValue] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const categories = queryClient.getQueryData<Categories[]>(["categories"]);
  console.log(categories);
  if (!categories) {
    return;
  }
  const categoriesCollection = createListCollection({
    items: categories.map((c) => ({ label: c.name, value: c.name })),
  });
  return (
    <Select.Root
      collection={categoriesCollection}
      width="341px"
      value={value}
      onValueChange={(e) => setValue(e.value)}
      variant="subtle"
    >
      <Select.HiddenSelect />
      <Select.Control bg={"white"} borderRadius={"10px"}>
        <Select.Trigger className="form-select">
          <Select.ValueText placeholder="Selecciona una categoría"></Select.ValueText>
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          {categoriesCollection.items.map((c) => (
            <Select.Item item={c} key={c.value}>
              {c.label}
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  );
}

export default CategorySelect;
