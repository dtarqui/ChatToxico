import axios from "axios";
export const upload = {
  methods: {
    analyze() {
      this.preview().then(() => {
        const accumulateMsg = [];
        for (let i in this.users) {
          accumulateMsg.push({ user: this.users[i] });
        }
        console.log(accumulateMsg);
        for (let msg in this.messages) {
          const chat = this.messages[msg];
          for (let i in accumulateMsg) {
            const user = accumulateMsg[i].user;
            if (user === chat.from) {
              if (accumulateMsg[i].message)
                accumulateMsg[i].message =
                  accumulateMsg[i].message + "\n" + chat.message;
              else accumulateMsg[i].message = chat.message;
            }
          }
        }
        console.log(accumulateMsg);
        for (let index in accumulateMsg) {
          axios
            .post("sentiment", { text: accumulateMsg[index].message })
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
              this.results.push({
                user: accumulateMsg[index].user,
                result: data,
              });
            })
            .finally(() => {
              this.analizing = false;
            });
        }
      });
    },
    onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    },
    async preview() {
      console.log(this.users);
      this.validate();
      if (!this.valid || this.file === null) return;
      this.loading = true;
      var reader = new FileReader();
      // Use the javascript reader object to load the contents
      // of the file in the v-model prop
      reader.readAsText(this.file);
      return new Promise((resolve) => {
        reader.onload = () => {
          console.log(reader.result)
          var pattern = /\d{1,2}\/\d{1,2}\/\d{2}/g;
          var indices = []
          var match
          while ((match = pattern.exec(reader.result)) !== null) {
              indices.push(match.index);
          }
          var resultx = [];
          for (let i = 0; i < indices.length; i++) {
              let str = reader.result.slice(indices[i], indices[i + 1]);
              resultx.push(str);
          }
          this.sample = null;
          // let result1 = reader.result.split("\n");
          resultx.shift();
          resultx.pop();
          let result2 = resultx.filter(
            (msg) =>
              !msg.includes(
                "Los mensajes y las llamadas están cifrados de extremo a extremo. Nadie fuera de este chat, ni siquiera WhatsApp, puede leerlos ni escucharlos. Toca para obtener más información."
              )
          );
          resultx = result2.filter(
            (msg) =>
              !msg.includes("se unió a través de un enlace de invitación")
          );
          result2 = resultx.filter((msg) => !msg.includes("Añadiste a "));
          let final = result2.filter(
            (msg) => !msg.includes("Cambió tu código de seguridad con")
          );
          final.map((val) => {
            // console.log(val);/
            const splitting = val.split(":");
            // console.log(splitting);
            const usertime = splitting[0] + ":" + splitting[1];
            let dateuser = usertime.split("-");
            splitting.shift();
            splitting.shift();
            const message = {
              date: dateuser[0],
              from: dateuser[1].substr(1),
              message: splitting.join(":"),
            };
            // console.log(message);
            this.users.push(dateuser[1].substr(1));
            var a = this.users;
            this.users = a.filter(this.onlyUnique);
            this.messages.push(message);
          });
          this.loading = false;
          resolve();
        };
      });
    },
  },
};

export const writting = {
  methods: {
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
