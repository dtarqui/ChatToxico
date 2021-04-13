<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <InfoChats>
          <template v-slot:title> Escribe el chat manualmente </template>
          Puedes escribir tu chat aqui. Separa los mensajes de las dos personas
          que quieres analizar. Escribe chats cortos, menores a 20 mensajes por
          persona.
        </InfoChats>
      </v-col>
      <v-col cols="12">
        <v-card class="mx-auto">
          <v-alert dense text type="success" v-if="successData">
            Analisis completo
          </v-alert>
          <v-card-actions class="justify-center">
            <v-row>
              <v-col cols="12" md="2" sm="1"></v-col>
              <v-col cols="12" md="8" sm="10">
                <v-slider
                  v-model="accurate"
                  :tick-labels="accurateLabels"
                  label="Precision"
                  :max="2"
                  step="1"
                  ticks="always"
                  tick-size="10"
                ></v-slider>
              </v-col>
              <v-col cols="12" md="2" sm="1"></v-col>
            </v-row>
          </v-card-actions>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <v-row align="center" justify="space-between">
                  <v-col v-for="(text, i) in chat1" :key="i" cols="12">
                    <v-row align="center" justify="center" no-gutters>
                      <v-col cols="12" sm="2">
                        <v-btn
                          class="mx-2"
                          icon
                          small
                          color="secondary"
                          @click="deleteText(text, i, 'chat1')"
                        >
                          <v-icon dark> mdi-delete </v-icon>
                        </v-btn>
                      </v-col>
                      <v-col cols="12" sm="10">
                        <v-text-field
                          label="Persona A"
                          v-model="chat1[i]"
                          clearable
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12">
                    <div align="center">
                      <v-btn
                        color="primary"
                        small
                        fab
                        @click="addTextToChat1()"
                      >
                        <v-icon>mdi-card-plus</v-icon>
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="6">
                <v-row align="center" justify="center" no-gutters>
                  <v-col v-for="(text, i) in chat2" :key="i" cols="12">
                    <v-row align="center" justify="center" no-gutters>
                      <v-col cols="12" sm="2">
                        <v-btn
                          class="mx-2"
                          icon
                          color="secondary"
                          @click="deleteText(text, i, 'chat2')"
                        >
                          <v-icon dark> mdi-delete </v-icon>
                        </v-btn>
                      </v-col>
                      <v-col cols="12" sm="10">
                        <v-card flat>
                          <v-text-field
                            label="Persona B"
                            v-model="chat2[i]"
                            clearable
                          ></v-text-field>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12">
                    <div align="center">
                      <v-btn
                        color="primary"
                        small
                        fab
                        @click="addTextToChat2()"
                      >
                        <v-icon>mdi-card-plus</v-icon>
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary">Borrar Todo</v-btn>
            <v-btn color="primary" :loading="analizing" @click="textAnalisis()"
              >Analizar Texto
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card class="mx-auto">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Resultados</v-toolbar-title>
            <!-- <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-reload</v-icon>
            </v-btn> -->
          </v-toolbar>
          <v-card-text class="text-center">
            <v-row>
              <result :headers="headers" :data="dataUser1"></result>
              <result :headers="headers" :data="dataUser2"></result>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import InfoChats from "../components/InfoChats.vue";
import Result from "../components/results/result.vue";
import axios from "axios";
export default {
  components: { InfoChats, Result },
  data: () => ({
    headers: [
      {
        text: "Data",
        align: "start",
        sortable: false,
        value: "name",
      },
      {
        text: "Values",
        align: "end",
        sortable: false,
        value: "data",
      },
    ],
    dataUser1: [
      {
        name: "Frozen Yogurt",
        data: "awqwr",
      },
    ],
    dataUser2: [],
    chat1: [""],
    chat2: [""],
    analizing: false,
    successData: false,
    accurateLabels: ["Menor", "Normal", "Maxima"],
    accurate: 0,
  }),
  methods: {
    deleteText(value, pos, toChat) {
      console.log(value, pos, toChat);
      if (toChat === "chat1") {
        this.chat1.splice(pos, 1);
      } else if (toChat === "chat2") {
        this.chat2.splice(pos, 1);
      }
    },
    addTextToChat1() {
      if (this.chat1[this.chat1.length - 1] !== "") this.chat1.push("");
    },
    addTextToChat2() {
      if (this.chat2[this.chat2.length - 1] !== "") this.chat2.push("");
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
        .post("sentiment", allChat1)
        .then((res) => {
          console.log(res);
          this.successData = true;
        })
        .finally(() => {
          this.analizing = true;
        });
      axios.post("sentiment", allChat2).then((res) => {
        console.log(res);
      });
      // setTimeout(() => {
      //   console.log(this.chat1);
      //   console.log(this.chat2);
      //   this.successData = true;
      //   this.analizing = false;
      // }, 3000);
    },
  },
};
</script>

<style>
</style>