<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" lg="12" md="12">
        <InfoChats>
          <template v-slot:title> Sube tu chat y analizalo </template>
          Puede subir tu chat aqui, presionar el boton de analizar y espera por
          los resultados.
        </InfoChats>
      </v-col>
      <v-col cols="12" lg="8">
        <v-card class="mx-auto" :loading="loading">
          <v-alert dense text type="success" v-if="successData" dismissible>
            Analisis completo
          </v-alert>
          <v-card-subtitle>
            Solo puedes subir archivos de texto menores a 20MB
          </v-card-subtitle>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-file-input
                v-model="file"
                color="primary"
                counter
                label="Selecciona tu archivo"
                placeholder="Select your file"
                prepend-icon="mdi-paperclip"
                :rules="[required, sizeRule]"
                outlined
                :show-size="1000"
                accept=".txt"
              >
                <template v-slot:selection="{ index, text }">
                  <v-chip v-if="index < 2" color="secondary" dark label small>
                    {{ text }}
                  </v-chip>
                </template>
              </v-file-input>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="preview()"> Previsualizar </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="analyze()"> Analizar </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card class="mx-auto">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon v-if="successData">
              <v-icon>mdi-reload</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text class="text-center">
            <div v-if="messages.length == 0">
              Aqui apareceran tus resultados ;D
            </div>
            <div v-else>
              <v-card-title class="justify-center">
                Usuarios en la conversacion
              </v-card-title>
              <v-card-text>
                <div v-for="(user, i) in users" :key="i">
                  {{ user }}
                </div>
              </v-card-text>
              <v-divider></v-divider>

              <v-row>
                <v-col cols="12" md="4" v-for="(resul, i) in results" :key="i">
                  {{ resul.user }}
                  <result :headers="headers" :data="resul.result"></result>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" v-if="messages.length > 0">
        <v-card class="mx-auto" max-width="80%">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Previsualizacion</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="text-center">
            <v-row>
              <v-col cols="12" v-for="(msg, n) in messages" :key="n">
                <message
                  :id="n"
                  :from="msg.from"
                  :user="msg.user"
                  :message="msg.message"
                  :end="msg.from != users[0] ? true : false"
                  @deleteRow="deleteChat($event)"
                ></message>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import Message from "../components/chats/Message.vue";
import InfoChats from "../components/InfoChats.vue";
import Result from "../components/results/result.vue";
import { rules } from "../mixins/rules";
import { headers } from "../mixins/tableHeaders";
export default {
  components: {
    InfoChats,
    Message,
    Result,
  },
  mixins: [rules, headers],
  data: () => ({
    successData: false,
    loading: false,
    file: null,
    valid: false,
    messages: [], // All messages
    users: [], // Only users - no messages
    results: [],
    title: "Resultados",
  }),
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

      // setInterval(() => {
      //   this.loading = false;
      //   this.successData = true;
      //   this.title = "Resultados";
      // }, 3000);
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
          // console.log(reader);
          this.sample = null;
          let result1 = reader.result.split("\n");
          result1.shift();
          result1.pop();
          let result2 = result1.filter(
            (msg) =>
              !msg.includes(
                "Los mensajes y las llamadas están cifrados de extremo a extremo. Nadie fuera de este chat, ni siquiera WhatsApp, puede leerlos ni escucharlos. Toca para obtener más información."
              )
          );
          result1 = result2.filter(
            (msg) =>
              !msg.includes("se unió a través de un enlace de invitación")
          );
          result2 = result1.filter((msg) => !msg.includes("Añadiste a "));
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
    validate() {
      this.$refs.form.validate();
    },
    onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    },
    deleteChat(id) {
      if (id > -1) {
        this.messages.splice(id, 1);
      }
    },
  },
};
</script>

<style>
</style>