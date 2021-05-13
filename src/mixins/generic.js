export const generic = {
  methods: {
    maxNumber(a, b, c, d) {
      let obj = { a, b, c, d },
        greatest = Object.values(obj)
          .sort()
          .pop(),
        key = Object.keys(obj).find((k) => obj[k] === greatest);

      console.log(key);
      return key;
    },
  },
};
