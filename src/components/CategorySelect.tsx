import { Select,  createListCollection } from "@chakra-ui/react";
import { useState } from "react";

type Props = {};

function CategorySelect({}: Props) {
  const [value, setValue] = useState<string[]>([]);
  return (
    <Select.Root
    paddingBottom={"10px"}
      collection={frameworks}
      width="320px"
      value={value}
      onValueChange={(e) => setValue(e.value)}
      variant="subtle"
    >
      <Select.HiddenSelect />
      <>
        <label className="form-label">Selecciona una categoría</label>
      </>

      <Select.Control bg={"white"} borderRadius={"10px"}>
        <Select.Trigger className="form-select">
          <Select.ValueText></Select.ValueText>
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>

      <Select.Positioner>
        <Select.Content>
          {frameworks.items.map((framework) => (
            <Select.Item item={framework} key={framework.value}>
              {framework.label}
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  );
}
const frameworks = createListCollection({
  items: [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ],
});

export default CategorySelect;
