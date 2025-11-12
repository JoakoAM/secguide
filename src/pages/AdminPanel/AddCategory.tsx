import { Center, Spinner, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type Props = {};

const AddCategory = ({}: Props) => {
  const [mostrar, setMostrar] = useState(false);
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
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="categoryName"
              placeholder="Nombre de la categoría"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Descripción de la categoría"
              className="form-control"
              id="categoryDescription"
            />
          </div>
          <button className="btn btn-primary">Guardar Categoría</button>
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
