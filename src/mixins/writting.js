import axios from "axios";

export const writting = {
  methods: {
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
    eraseAll() {
      this.dataUser1 = [];
      this.dataUser2 = [];
      this.chat1 = [""];
      this.chat2 = [""];
      this.analizing = false;
      this.successData = false;
    },
    textAnalisis() {
      this.successData = false;
      this.analizing = true;
      let allChat1 = "";
      let allChat2 = "";
      this.chat1.forEach((value) => {
        allChat1 = allChat1 + value + "\n";
      });
      this.chat2.forEach((value) => {
        allChat2 = allChat2 + value + "\n";
      });
      console.log(allChat1, allChat2);
      axios
        .post("sentiment", { text: allChat1 })
        .then((res) => {
          const result = res.data;
          const data = [];
          for (let key in result) {
            const value = result[key];
            const rest = { name: key, data: value };
            data.push(rest);
          }
          this.successData = true;
          this.dataUser1 = data;
          this.max1 = this.maxNumber(
            result.positive,
            result.negative,
            result.neutral,
            result.mixed
          );
          console.log(this.max1);
          axios
            .post("entities", { text: allChat1 })
            .then((res) => {
              console.log(res);
              const result = res.data[0];
              const data = [];
              for (let key in result) {
                const value = result[key];
                const rest = { name: key, data: value };
                console.log(rest);
                data.push(rest);
              }
              this.successData = true;
              this.dataUser1 = this.dataUser1.concat(data);
            })
            .finally(() => {
              this.analizing = false;
            });
        })
        .finally(() => {
          this.analizing = false;
        });

      axios
        .post("sentiment", { text: allChat2 })
        .then((res) => {
          console.log(res);
          const result = res.data;
          const data = [];
          for (let key in result) {
            const value = result[key];
            const rest = { name: key, data: value };
            console.log(rest);
            data.push(rest);
          }
          this.successData = true;
          this.dataUser2 = data;
          this.max2 = this.maxNumber(
            result.positive,
            result.negative,
            result.neutral,
            result.mixed
          );
          axios
            .post("entities", { text: allChat2 })
            .then((res) => {
              console.log(res);
              const result = res.data[0];
              const data = [];
              for (let key in result) {
                const value = result[key];
                const rest = { name: key, data: value };
                console.log(rest);
                data.push(rest);
              }
              this.successData = true;
              this.dataUser2 = this.dataUser2.concat(data);
            })
            .finally(() => {
              this.analizing = false;
            });
        })
        .finally(() => {
          this.analizing = false;
        });
    },
  },
};
