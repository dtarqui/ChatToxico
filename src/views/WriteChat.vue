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
          <v-alert dense text type="error" v-if="errorText">
            Solo puedes crear una fila si la anterior esta completa
          </v-alert>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <v-row align="center" justify="space-between">
                  <v-col v-for="(text, i) in chat1" :key="i" cols="12">
                    <v-row align="center" justify="center">
                      <v-col cols="12" sm="10">
                        <v-card flat>
                          <v-text-field
                            label="Tú"
                            v-model="chat1[i]"
                            @click:append-outer="deleteText(text, i, 'chat1')"
                            :append-outer-icon="chat1[i] ? 'mdi-delete' : ''"
                            clearable
                            hide-details
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
                        @click="addTextToChat1()"
                      >
                        <v-icon>mdi-card-plus</v-icon>
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="12" sm="6">
                <v-row align="center" justify="center">
                  <v-col v-for="(text, i) in chat2" :key="i" cols="12">
                    <v-row align="center" justify="center">
                      <v-col cols="12" sm="10">
                        <v-card flat>
                          <v-text-field
                            label="La persona con quien te comunicas"
                            v-model="chat2[i]"
                            @click:append-outer="deleteText(text, i, 'chat2')"
                            :append-outer-icon="chat2[i] ? 'mdi-delete' : ''"
                            clearable
                            hide-details
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
            <v-btn color="secondary" @click="eraseAll">Borrar Todo</v-btn>
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
            <v-spacer></v-spacer>
            <v-btn icon v-if="successData" @click="textAnalisis()">
              <v-icon>mdi-reload</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text class="text-center">
            <v-row>
              <v-col cols="12" md="6">
                <result
                  :headers="headers"
                  :data="dataUser1"
                  :value="max1.value * 100"
                  :color="max1.color"
                ></result>
              </v-col>
              <v-col cols="12" md="6">
                <result
                  :headers="headers"
                  :data="dataUser2"
                  :value="max2.value * 100"
                  :color="max2.color"
                ></result>
              </v-col>
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
import { headers } from "../mixins/table";
import { writting } from "../mixins/files";
export default {
  components: { InfoChats, Result },
  mixins: [headers, writting],
  data: () => ({
    dataUser1: [],
    dataUser2: [],
    chat1: [""],
    chat2: [""],
    max1: { value: 0, color: "" },
    max2: { value: 0, color: "" },
    analizing: false,
    successData: false,
    errorText: false,
    accurateLabels: ["Baja", "Normal"],
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
      if (this.chat1[this.chat1.length - 1] !== "") {
        this.errorText = false;
        this.chat1.push("");
      } else {
        this.errorText = true;
      }
    },
    addTextToChat2() {
      if (this.chat2[this.chat2.length - 1] !== "") {
        this.errorText = false;
        this.chat2.push("");
      } else {
        this.errorText = true;
      }
    },
 
  },
};
</script>

<style>
</style>
