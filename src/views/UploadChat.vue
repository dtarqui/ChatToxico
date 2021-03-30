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
          <v-alert dense text type="success" v-if="successData">
            Analisis completo
          </v-alert>
          <v-card-subtitle>
            Solo puedes subir archivos de texto menores a 20MB
          </v-card-subtitle>
          <v-card-text>
            <v-file-input
              v-model="files"
              color="primary"
              counter
              label="Selecciona tu archivo"
              placeholder="Select your files"
              prepend-icon="mdi-paperclip"
              hide-details
              outlined
              :show-size="1000"
            >
              <template v-slot:selection="{ index, text }">
                <v-chip v-if="index < 2" color="secondary" dark label small>
                  {{ text }}
                </v-chip>
              </template>
            </v-file-input>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="analyze()">Analizar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card class="mx-auto">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Resultados</v-toolbar-title>
            <!-- <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-magnify</v-icon>
            </v-btn> -->
          </v-toolbar>
          <v-card-text>Aqui apareceran tus resultados ;D</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import InfoChats from "../components/InfoChats.vue";
export default {
  components: {
    InfoChats,
  },
  data: () => ({
    successData: false,
    loading: false,
    files: null,
  }),
  methods: {
    analyze() {
      this.loading = true;
      setInterval(() => {
        this.loading = false;
        this.successData = true;
      }, 3000);
    },
  },
};
</script>

<style>
</style>