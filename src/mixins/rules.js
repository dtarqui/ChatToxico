export const rules = {
  data: () => ({
    sizeRule: (value) =>
      !value || value.size < 20000000 || "El archivo debe ser menos de 20MB!",
    required: (v) => !!v || "Es necesario que escoja un archivo",
    loginEmailRules: [
      (v) => !!v || "Requerido",
      (v) => /.+@.+\..+/.test(v) || "El email debe ser valido",
    ],
    emailRules: [
      (v) => !!v || "Requerido",
      (v) => /.+@.+\..+/.test(v) || "El email debe ser valido",
    ],
    rules: {
      required: (value) => !!value || "Requerido",
      min: (v) => (v && v.length >= 8) || "Min 8 caracteres",
    },
  }),
};
