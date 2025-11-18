import { Button, Center, Input, Spinner, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState, type InputEvent } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { Categories } from "../../types";
import useAddCat from "../../hooks/useAddCat";

type Props = {};

const AddCategory = ({}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Categories>({
    mode: "onSubmit", // o "onChange" si quieres validar en tiempo real
  });
  const [characDesc, setCharacDesc] = useState(0);
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
  };

  console.log(errors);
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
              <input
                type="text"
                {...register("name", {
                  required: { value: true, message: "Campo requerido" },
                  maxLength: { value: 20, message: "Max 20 caracteres" },
                  minLength: { value: 10, message: "Minimo 10 caracteres" },
                })}
                className="form-control"
                color={"black"}
                placeholder={"Nombre de categoría"}
              />
              {errors.name ? <span>{errors.name.message}</span> : ""}
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Descripción de la categoría"
                className="form-control"
                {...register("desc", {
                  maxLength: { value: 60, message: "Max 60 caracteres" },
                  required: { value: true, message: "Campo requerido" },
                  minLength: { value: 10, message: "Minimo 10 caracteres" },
                })}
              ></input>
              {errors.desc ? (
                <Text transition={"all 0.5s"} animation="fade-in 0.5s ease-out">
                  {errors.desc.message}
                </Text>
              ) : (
                ""
              )}
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
