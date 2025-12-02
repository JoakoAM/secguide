import {
  Button,
  Center,
  Field,
  HStack,
  SegmentGroup,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CategorySelect from "../categories/CategorySelect";
import { Controller, useForm } from "react-hook-form";
import { SiMacos } from "react-icons/si";
import { FaLinux, FaWindows } from "react-icons/fa";
type Props = {};

const AddTool = ({}: Props) => {
  const [mostrar, setMostrar] = useState(false);
  const { register, handleSubmit, control } = useForm();
  useEffect(() => {
    let timeout: number;
    timeout = setTimeout(() => {
      setMostrar(true);
    }, 1500);
    () => {
      clearTimeout(timeout);
    };
  }, []);
  if (mostrar) {
    return (
      <>
        <Stack animation="fade-in 0.8s ease-out" h={"100%"} gap="1">
          <Center>
            <h3>Añadir nueva herramienta</h3>
          </Center>
          <Stack
            bg={"rgba(255, 255, 255, 0.19)"}
            borderRadius="10px"
            id="addToolForm"
            className="admin-form"
            p={"10px"}
            gap={4}
          >
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="toolName"
                placeholder="Nombre de la herramienta"
              />
            </div>
            <div className="mb-3">
              <textarea
                style={{ maxHeight: "100px" }}
                className={"form-control"}
                placeholder="Descripción breve"
                id="toolBrief"
              ></textarea>
            </div>
            <div className="mb-3">
              <CategorySelect></CategorySelect>
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="toolFunc"
                placeholder="Funcionalidades"
              />
            </div>
            <div className="mb-3">
              <Controller
                control={control}
                name="Plataforma"
                render={({ field }) => (
                  <Field.Root>
                    <Field.Label>Plataforma</Field.Label>
                    <SegmentGroup.Root
                      size="sm"
                      onBlur={field.onBlur}
                      name={field.name}
                      value={field.value}
                      onValueChange={({ value }) => {
                        field.onChange(value);
                        console.log(value);
                      }}
                    >
                      <SegmentGroup.Items
                        items={[
                          {
                            value: "Windows",
                            label: (
                              <HStack>
                                <FaWindows />
                                Win
                              </HStack>
                            ),
                          },
                          {
                            value: "MacOS",
                            label: (
                              <HStack>
                                <SiMacos />
                                MacOs
                              </HStack>
                            ),
                          },
                          {
                            value: "Linux",
                            label: (
                              <HStack>
                                <FaLinux />
                                Linux
                              </HStack>
                            ),
                          },
                        ]}
                      />
                      <SegmentGroup.Indicator />
                    </SegmentGroup.Root>
                  </Field.Root>
                )}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="toolLicense"
                placeholder="Licencia"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="toolLink"
                placeholder="Enlace oficial"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="toolArticle"
                placeholder="Artículo descriptivo"
              />
            </div>

            <Button
              borderRadius={"10px"}
              transition={"ease 0.5s"}
              bg={"rgba(0, 110, 255, 0.75)"}
              _hover={{
                bg: "rgba(0, 132, 255, 0.59)",
              }}
            >
              Guardar Herramienta
            </Button>
          </Stack>
        </Stack>
      </>
    );
  }
  return (
    <Center>
      <Spinner />;
    </Center>
  );
};

export default AddTool;
