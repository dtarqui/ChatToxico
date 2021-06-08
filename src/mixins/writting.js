import axios from "axios";

export const writting = {
  methods: {
    eraseAll() {
      this.dataUser1 = [];
      this.dataUser2 = [];
      this.chat1 = [""];
      this.chat2 = [""];
      this.analizing = false;
      this.successData = false;
      this.errorText = false;
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
        .post("toxic/chat/text", { text: allChat1 })
        .then((res) => {
          const result = res.data.comprehend;
          const data = [];
          for (let key in result) {
            const value = result[key];
            const rest = { name: key, data: value };
            data.push(rest);
          }
          console.log(result);
          this.successData = true;
          this.dataUser1 = data;
          this.max1 = this.maxNumber(
            result.positive,
            result.negative,
            result.neutral,
            result.mixed
          );
          console.log(this.max1);
        })
        .finally(() => {
          this.analizing = false;
        });
    },
  },
};
