import {
  Button,
  Center,
  Field,
  Input,
  InputGroup,
  Separator,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import useAddCat from "../../hooks/useAddCat";
import type { Categories } from "../../types";
import { FaToolbox } from "react-icons/fa";
import { TbTournament } from "react-icons/tb";

type Props = {};

const AddCategory = ({}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm<Categories>({
    mode: "onSubmit", // o "onChange" si quieres validar en tiempo real
  });
  const {
    mutate: addCat,
    isPending: isPendingAdd,
    error: errorAdd,
  } = useAddCat();
  const [mostrar, setMostrar] = useState(false);
  useEffect(() => {
    let timeout: number;
    timeout = setTimeout(() => {
      setMostrar(true);
    }, 1500);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  const onSubmit: SubmitHandler<Categories> = (data) => {
    addCat(data);
    resetForm();
  };

  if (mostrar) {
    return (
      <>
        <Center>
          <h3>Añadir Nueva Categoría</h3>
        </Center>
        <Stack
          animation="fade-in 0.5s ease-out"
          bg={"rgba(255, 255, 255, 0.19)"}
          borderRadius="10px"
          p={"5px"}
          gap={4}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <Field.Root invalid={!!errors.name}>
                <InputGroup startElement={<TbTournament fontWeight="bold" />}>
                  <Input
                    bg={"whiteAlpha.900"}
                    type="text"
                    {...register("name", {
                      maxLength: { value: 20, message: "Max 20 caracteres" },
                      required: { value: true, message: "Campo requerido" },
                      minLength: { value: 10, message: "Minimo 10 caracteres" },
                    })}
                    color={"black"}
                    placeholder={"Nombre de categoría"}
                  />
                </InputGroup>
                <Field.ErrorText
                  color={"red.600"}
                  width={"full"}
                  p="2px"
                  justifyContent={"flex-end"}
                  animation="fade-in 0.5s ease-out"
                >
                  {errors.name?.message}
                </Field.ErrorText>
              </Field.Root>
            </div>
            <div className="mb-3">
              <Field.Root invalid={!!errors.desc}>
                <InputGroup startElement={<FaToolbox />}>
                  <Input
                    bg={"whiteAlpha.900"}
                    type="text"
                    placeholder="Descripción de la categoría"
                    {...register("desc", {
                      maxLength: { value: 60, message: "Max 60 caracteres" },
                      required: { value: true, message: "Campo requerido" },
                      minLength: { value: 10, message: "Minimo 10 caracteres" },
                    })}
                  />
                </InputGroup>
                <Field.ErrorText
                  color={"red.600"}
                  width={"full"}
                  p="2px"
                  justifyContent={"flex-end"}
                  animation="fade-in 0.5s ease-out"
                >
                  {errors.desc?.message}
                </Field.ErrorText>
              </Field.Root>
            </div>
            <Button
              type="submit"
              justifySelf={"center"}
              w="full"
              disabled={errors.name || errors.desc ? true : false}
              className="btn btn-primary"
              borderRadius={"10px"}
              transition={"ease 0.5s"}
              bg={"rgba(0, 110, 255, 0.75)"}
              _hover={{
                bg: "rgba(0, 132, 255, 0.59)",
              }}
            >
              Guardar Categoría
            </Button>
          </form>
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

export default AddCategory;
