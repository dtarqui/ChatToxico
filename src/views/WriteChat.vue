<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <info-upload-chat></info-upload-chat>
      </v-col>
      <v-col cols="12">
        <v-card class="mx-auto">
          <v-alert dense text type="success" v-if="successData">
            Analisis completo
          </v-alert>
          <v-card-actions>
            <v-slider
              v-model="accurate"
              :tick-labels="accurateLabels"
              label="Precision"
              :max="2"
              step="1"
              ticks="always"
              tick-size="1"
            ></v-slider>
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
    </v-row>
  </v-container>
</template>

<script>
import InfoUploadChat from "../components/InfoUploadChat.vue";
export default {
  components: { InfoUploadChat },
  data: () => ({
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
      setTimeout(() => {
        console.log(this.chat1);
        console.log(this.chat2);
        this.successData = true;
        this.analizing = false;
      }, 3000);
      // setTimeout(() => {
      //   this.successData = false;
      // }, 8000);
    },
  },
};
</script>

<style>
</style>