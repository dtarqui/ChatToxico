export const rules = {
  data: () => ({
    sizeRule: (value) =>
      !value || value.size < 20000000 || "El archivo debe ser menos de 20MB!",
    required: (v) => !!v || "Es necesario que escoja un archivo",
  }),
};
