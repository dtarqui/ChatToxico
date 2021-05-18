import axios from "axios";
export const upload = {
  methods: {
    analyze() {
      this.clean();
      this.preview().then(() => {
        this.colorUser();
        this.analizeMessages();
        const accumulateMsg = [];
        for (let i in this.users) {
          accumulateMsg.push({ user: this.users[i] });
        }
        // console.log(accumulateMsg);
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
        // console.log(accumulateMsg);
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
                data.push(rest);
              }
              this.successData = true;
              const max = this.maxNumber(
                result.positive,
                result.negative,
                result.neutral,
                result.mixed
              );
              this.results.push({
                user: accumulateMsg[index].user,
                result: data,
                max: max,
              });
            })
            .finally(() => {
              this.analizing = false;
            });
        }
      });
    },
    saveResults() {},
    onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    },
    preview() {
      this.validate();
      if (!this.valid || this.file === null) return;
      this.loading = true;
      var reader = new FileReader();
      reader.readAsText(this.file);

      return new Promise((resolve) => {
        reader.onload = () => {
          var pattern = /\d{1,2}\/\d{1,2}\/\d{2}/g;
          var index = [];
          var match;
          while ((match = pattern.exec(reader.result)) !== null) {
            index.push(match.index);
          }
          var resultx = [];
          for (let i = 0; i < index.length; i++) {
            let str = reader.result.slice(index[i], index[i + 1]);
            resultx.push(str);
          }
          this.sample = null;

          // Delete first element
          resultx.shift();
          // Delete last element
          resultx.pop();
          let final = this.filterMessages(resultx);
          final.map((val) => {
            //  Get date and user
            const splitting = val.split(":");
            const usertime = splitting[0] + ":" + splitting[1];
            let dateuser = usertime.split(" - ");

            // Deleting date an user
            splitting.shift();
            splitting.shift();

            const message = {
              date: dateuser[0],
              from: dateuser[1],
              message: splitting.join(":"), // Joining if some message have ":"
            };

            // Saving user
            this.users.push(dateuser[1]);

            // Delete repeat user
            this.users = this.users.filter(this.onlyUnique);
            this.messages.push(message);
          });
          this.loading = false;
          resolve();
        };
      });
    },
    analizeMessages() {
      const formData = {
        data: this.messages,
      };
      axios
        .post("sentiment/messages", formData)
        .then((res) => {
          console.log(res);
          this.messagesResult = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    generarLetra() {
      var letras = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
      ];
      var numero = (Math.random() * 15).toFixed(0);
      return letras[numero];
    },
    colorHEX() {
      var coolor = "";
      for (var i = 0; i < 6; i++) {
        coolor = coolor + this.generarLetra();
      }
      return "#" + coolor;
    },

    colorUser() {
      this.users.map((value) => {
        this.usercolors.push({ user: value, color: this.colorHEX() });
      });
      console.log(this.usercolors);
    },
    filterMessages(data) {
      return data.filter(
        (msg) =>
          !msg.includes(
            "Los mensajes y las llamadas están cifrados de extremo a extremo. Nadie fuera de este chat, ni siquiera WhatsApp, puede leerlos ni escucharlos. Toca para obtener más información."
          ) &&
          !msg.includes("se unió a través de un enlace de invitación") &&
          !msg.includes("Cambió tu código de seguridad con") &&
          !msg.includes("Añadiste a") &&
          !msg.includes("<Multimedia omitido>") &&
            !msg.includes("se unió usando el enlace de invitación de este grupo") &&
            !msg.includes("salió del grupo") &&
            !msg.includes("Se te añadió al grupo") &&
            !msg.includes("cambió a") &&
            !msg.includes("eliminó a") &&
            !msg.includes("creó el grupo \"")
      );
    },
    clean() {
      this.users = [];
      this.messages = [];
    },
  },
};
