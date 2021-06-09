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
              <v-card-text class="text-center">
                <v-row align="center" justify="center">
                  <v-col
                    cols="12"
                    md="6"
                    sm="6"
                    v-for="(user, i) in users"
                    :key="i"
                  >
                    <v-card>
                      <v-card-text class="text-center"> {{ user }}</v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-divider></v-divider>

              <v-row>
                <v-col cols="12" md="4" v-for="(resul, i) in results" :key="i">
                  {{ resul.user }}
                  <result
                    :headers="headers"
                    :data="resul.result"
                    :more="more"
                    :color="resul.max.color"
                    :value="resul.max.value * 100"
                  ></result>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="12" md="3">
                  <v-switch
                    v-model="more"
                    v-if="successData"
                    color="primary"
                    label="Mas informacion"
                  ></v-switch>
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
            <v-card-text>
              Please stand by
              <v-progress-linear
                indeterminate
                color="white"
                class="mb-0"
                v-if="loadresults != false"
              ></v-progress-linear>
            </v-card-text>
            <v-row v-if="loadresults != false">
              <v-col cols="12" v-for="(msg, n) in messages" :key="n">
                <message
                  :id="n"
                  :emoticon="msg.emoticon"
                  :user="msg.from"
                  :message="msg.message"
                  :coloremoticon="msg.coloremoticon"
                  :usercolor="usercolors"
                  :end="false"
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
import Message from "../components/chats/Message.vue";
import InfoChats from "../components/InfoChats.vue";
import Result from "../components/results/result.vue";
import { rules } from "../mixins/rules";
import { headers } from "../mixins/table";
import { upload } from "../mixins/uploading";
import { generic } from "../mixins/generic";
export default {
  components: {
    InfoChats,
    Message,
    Result,
  },
  mixins: [rules, headers, upload, generic],
  data: () => ({
    more: false,
    successData: false,
    loading: false,
    file: null,
    valid: false,
    messages: [], // All messages
    users: [], // Only users - no messages
    results: [],
    title: "Resultados",
    loadresults: true,
    usercolors: [],
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
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
