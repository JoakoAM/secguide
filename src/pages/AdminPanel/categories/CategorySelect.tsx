import { Field, HStack, Select, createListCollection } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { GoMultiSelect } from "react-icons/go";
import stylesField from "../../../styles/Field.module.css";
import type { Categories, Tools } from "../../../types";

type Props = {
  control: Control<Tools, any, Tools>;
  errors: FieldErrors<Tools>;
};

function CategorySelect({ control, errors }: Props) {
  const queryClient = useQueryClient();
  const categories = queryClient.getQueryData<Categories[]>(["categories"]);
  if (!categories) {
    return;
  }
  const categoriesCollection = createListCollection({
    items: categories.map((c) => ({ label: c.name, value: c.name })),
  });
  return (
    <Field.Root width="auto" invalid={!!errors.cats}>
      <Controller
        control={control}
        name="cats"
        rules={{ required: { value: true, message: "*Campo requerido" } }}
        render={({ field }) => (
          <Select.Root
            collection={categoriesCollection}
            name={field.name}
            value={field.value}
            onValueChange={({ value }) => field.onChange(value)}
            variant="subtle"
          >
            <Select.HiddenSelect />
            <Select.Control bg={"white"} borderRadius={"10px"}>
              <Select.Trigger className="form-select">
                <HStack>
                  <GoMultiSelect />
                  <Select.ValueText
                    color={field.value ? "black" : "#585b5e"}
                    placeholder="Selecciona una categoría"
                  ></Select.ValueText>
                </HStack>
              </Select.Trigger>
            </Select.Control>
            <Select.Positioner>
              <Select.Content fontWeight={"inherit"}>
                {categoriesCollection.items.map((c) => (
                  <Select.Item item={c} key={c.value}>
                    {c.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Select.Root>
        )}
      />
      <Field.ErrorText
        className={stylesField.errorText}
        animation="fade-in 0.5s ease-out"
        key={errors.brief?.type}
      >
        {errors.cats?.message}
      </Field.ErrorText>
    </Field.Root>
  );
}

export default CategorySelect;
