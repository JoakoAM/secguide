import {
  Button,
  Center,
  Field,
  Input,
  InputGroup,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import useAddCat from "../../../hooks/useAddCat";
import type { Categories } from "../../../types";
import { FaToolbox } from "react-icons/fa";
import { TbTournament } from "react-icons/tb";
import stylesDialog from "../../../styles/Dialog.module.css";
import stylesField from "../../../styles/Field.module.css";

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
  const { mutate: addCat } = useAddCat();
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
                  className={stylesField.errorText}
                  animation="fade-in 0.5s ease-out"
                  key={errors.name?.type}
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
                  className={stylesField.errorText}
                  animation="fade-in 0.5s ease-out"
                  key={errors.desc?.type}
                >
                  {errors.desc?.message}
                </Field.ErrorText>
              </Field.Root>
            </div>
            {errors.name || errors.desc ? (
              <Button
                type="button"
                disabled={errors.name || errors.desc ? true : false}
                className={stylesDialog.btnBodyDisabled}
              >
                Guardar Categoría
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={errors.name || errors.desc ? true : false}
                className={stylesDialog.btnBody}
              >
                Guardar Categoría
              </Button>
            )}
          </form>
        </Stack>
      </>
    );
  }
  return (
    <Center>
      <Spinner w="70px" h="70px" />;
    </Center>
  );
};

export default AddCategory;
