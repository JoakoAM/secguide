import {
  Button,
  Center,
  CheckboxCard,
  CheckboxGroup,
  Field,
  Fieldset,
  HStack,
  Icon,
  Input,
  InputGroup,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useController, useForm } from "react-hook-form";
import { FaLinux, FaToolbox, FaWindows } from "react-icons/fa";
import { GrSystem } from "react-icons/gr";
import { LuLink } from "react-icons/lu";
import { PiArticleNyTimes } from "react-icons/pi";
import { SiMacos } from "react-icons/si";
import { TbLicense, TbSettingsCog, TbTournament } from "react-icons/tb";
import type { Tools } from "../../../types";
import CategorySelect from "../categories/CategorySelect";
import stylesDialog from "../../../styles/Dialog.module.css";
import stylesField from "../../../styles/Field.module.css";

type Props = {};

const AddTool = ({}: Props) => {
  const [mostrar, setMostrar] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Tools>();
  useEffect(() => {
    let timeout: number;
    timeout = setTimeout(() => {
      setMostrar(true);
    }, 1500);
    () => {
      clearTimeout(timeout);
    };
  }, []);

  const items = [
    { icon: <FaWindows />, label: "Win", value: "Win" },
    { icon: <SiMacos />, label: "MacOs", value: "MacOs" },
    {
      icon: <FaLinux />,
      label: "Linux",
      value: "Linux",
    },
  ];

  const plataforma = useController({
    control,
    name: "platform",
    defaultValue: [],
  });

  if (mostrar) {
    const onSubmit = handleSubmit((data) => {
      console.log(data.cats.toString());
      const plataforma = data.platform as string[];
      console.log(plataforma.join("/"));
      console.log(data);
      {
        /*
            name: name,
      brief: brief,
      cats: [category],
      func: func,
      platform: platform,
      license: license,
      link: link,
      article: article,
      approved: true,
      createdBy: currentUser.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      ESTE ORDEN DEBE LLEVAR AL MOMENTO DE AÑADIR A BBDD
      */
      }
    });
    return (
      <>
        <Stack animation="fade-in 0.8s ease-out" h={"100%"} gap="1">
          <Center>
            <h3>Añadir nueva herramienta</h3>
          </Center>
          <form onSubmit={onSubmit}>
            <Stack
              bg={"rgba(255, 255, 255, 0.19)"}
              borderRadius="10px"
              id="addToolForm"
              p={"10px"}
              gap={4}
            >
              <div className="mb-3" id="toolName">
                <Field.Root invalid={!!errors.name}>
                  <InputGroup startElement={<TbTournament fontWeight="bold" />}>
                    <Input
                      bg={"whiteAlpha.900"}
                      type="text"
                      {...register("name", {
                        maxLength: { value: 20, message: "*Max 20 caracteres" },
                        required: { value: true, message: "*Campo requerido" },
                        minLength: {
                          value: 10,
                          message: "*Minimo 10 caracteres",
                        },
                      })}
                      color={"black"}
                      placeholder={"Nombre de la herramienta"}
                      className="form-control"
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
              <div className="mb-3" id="toolBrief">
                <Field.Root invalid={!!errors.brief}>
                  <InputGroup startElement={<FaToolbox />}>
                    <Input
                      className="form-control"
                      bg={"whiteAlpha.900"}
                      type="text"
                      placeholder="Descripción breve"
                      {...register("brief", {
                        maxLength: {
                          value: 60,
                          message: "*Max 60 caracteres",
                        },
                        required: { value: true, message: "*Campo requerido" },
                        minLength: {
                          value: 10,
                          message: "*Minimo 10 caracteres",
                        },
                      })}
                    />
                  </InputGroup>
                  <Field.ErrorText
                    className={stylesField.errorText}
                    animation="fade-in 0.5s ease-out"
                    key={errors.brief?.type}
                  >
                    {errors.brief?.message}
                  </Field.ErrorText>
                </Field.Root>
              </div>
              <div className="mb-3" id="toolCategories">
                <CategorySelect
                  control={control}
                  errors={errors}
                ></CategorySelect>
              </div>
              <div className="mb-3" id="toolFunc">
                <Field.Root invalid={!!errors.func}>
                  <InputGroup startElement={<TbSettingsCog />}>
                    <Input
                      bg={"whiteAlpha.900"}
                      type="text"
                      placeholder="Funcionalidades"
                      className="form-control"
                      {...register("func", {
                        maxLength: { value: 60, message: "*Max 60 caracteres" },
                        required: { value: true, message: "*Campo requerido" },
                        minLength: {
                          value: 10,
                          message: "*Minimo 10 caracteres",
                        },
                      })}
                    />
                  </InputGroup>
                  <Field.ErrorText
                    className={stylesField.errorText}
                    animation="fade-in 0.5s ease-out"
                    key={errors.func?.type}
                  >
                    {errors.func?.message}
                  </Field.ErrorText>
                </Field.Root>
              </div>
              <div className="mb-3" id="toolPlatform">
                <Fieldset.Root>
                  <Fieldset.Legend>
                    <HStack>
                      <GrSystem />
                      Plataforma
                    </HStack>
                  </Fieldset.Legend>
                  <CheckboxGroup
                    value={plataforma.field.value as string[]}
                    onValueChange={plataforma.field.onChange}
                    name={plataforma.field.name}
                  >
                    <Fieldset.Content alignItems={"center"}>
                      <HStack gap={12}>
                        {items.map((item) => (
                          <CheckboxCard.Root
                            align="center"
                            value={item.value}
                            key={item.label}
                            className="form-control"
                          >
                            <CheckboxCard.HiddenInput />
                            <CheckboxCard.Control>
                              <CheckboxCard.Content fontSize={"23px"}>
                                <Icon fontSize="2xl" mb="2">
                                  {item.icon}
                                </Icon>
                                <CheckboxCard.Label>
                                  {item.label}
                                </CheckboxCard.Label>
                              </CheckboxCard.Content>
                            </CheckboxCard.Control>
                          </CheckboxCard.Root>
                        ))}
                      </HStack>
                    </Fieldset.Content>
                  </CheckboxGroup>
                </Fieldset.Root>
              </div>
              <div className="mb-3" id="toolLicense">
                <Field.Root invalid={!!errors.license}>
                  <InputGroup startElement={<TbLicense />}>
                    <Input
                      bg={"whiteAlpha.900"}
                      type="text"
                      placeholder="Licencia"
                      className="form-control"
                      {...register("license", {
                        maxLength: { value: 60, message: "*Max 60 caracteres" },
                        required: { value: true, message: "*Campo requerido" },
                        minLength: {
                          value: 10,
                          message: "*Minimo 10 caracteres",
                        },
                      })}
                    />
                  </InputGroup>
                  <Field.ErrorText
                    className={stylesField.errorText}
                    key={errors.license?.type}
                    animation="fade-in 0.5s ease-out"
                  >
                    {errors.license?.message}
                  </Field.ErrorText>
                </Field.Root>
              </div>
              <div className="mb-3" id="toolLink">
                <Field.Root invalid={!!errors.link}>
                  <InputGroup startElement={<LuLink />}>
                    <Input
                      bg={"whiteAlpha.900"}
                      type="text"
                      placeholder="Enlace oficial"
                      className="form-control"
                      {...register("link", {
                        required: { value: true, message: "*Campo requerido" },
                        pattern: {
                          value:
                            /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=.]+)?$/,
                          message: "*Debe ser un link válido",
                        },
                      })}
                    />
                  </InputGroup>
                  <Field.ErrorText
                    className={stylesField.errorText}
                    key={errors.link?.type}
                    animation="fade-in 0.5s ease-out"
                  >
                    {errors.link?.message}
                  </Field.ErrorText>
                </Field.Root>
              </div>
              <div className="mb-3" id="toolArticle">
                <Field.Root invalid={!!errors.article}>
                  <InputGroup startElement={<PiArticleNyTimes />}>
                    <Input
                      bg={"whiteAlpha.900"}
                      type="text"
                      placeholder="Artículo descriptivo"
                      className="form-control"
                      {...register("article", {
                        maxLength: {
                          value: 2500,
                          message: "*Max 2500 caracteres",
                        },
                        required: { value: true, message: "*Campo requerido" },
                        minLength: {
                          value: 200,
                          message: "*Minimo 200 caracteres",
                        },
                      })}
                    />
                  </InputGroup>
                  <Field.ErrorText
                    className={stylesField.errorText}
                    key={errors.article?.type}
                    animation="fade-in 0.5s ease-out"
                  >
                    {errors.article?.message}
                  </Field.ErrorText>
                </Field.Root>
              </div>
              <Button
                type="submit"
                className={stylesDialog.btnBody}
                disabled={errors.root?.message ? true : false}
              >
                Guardar Herramienta
              </Button>
            </Stack>
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

export default AddTool;
