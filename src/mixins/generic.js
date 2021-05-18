export const generic = {
  methods: {
    // maxNumber(a, b, c, d) {
    //   let obj = { a, b, c, d },
    //     greatest = Object.values(obj)
    //       .sort()
    //       .pop(),
    //     key = Object.keys(obj).find((k) => obj[k] === greatest);
    //   console.log(key);
    //   return key;
    // },
    maxNumber(a, b, c, d) {
      if (a > b && a > c && a > d) {
        return { value: a, color: "green" };
      }
      if (b > a && b > c && b > d) {
        return { value: b, color: "red" };
      }
      if (c > b && c > a && c > d) {
        return { value: c, color: "grey" };
      }
      if (d > b && d > c && d > a) {
        return { value: d, color: "yellow" };
      }
    },
  },
};
