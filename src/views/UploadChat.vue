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
            <!-- <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-magnify</v-icon>
            </v-btn> -->
          </v-toolbar>
          <v-card-text class="text-center">
            <div v-for="(message, i) in messages" :key="i">
              {{ message.user + ": "+ message.message }}
              <hr />
            </div>
            <br />
            {{ sample }}

            <br />
            {{ messages.length }}
          </v-card-text>
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
    sample: "Aqui apareceran tus resultados ;D",
    successData: false,
    loading: false,
    file: null,
    valid: false,
    messages: [],
    persons: [],
    title: "Resultados",
    sizeRule: (value) =>
      !value || value.size < 20000000 || "El archivo debe ser menos de 20MB!",
    required: (v) => !!v || "Es necesario que escoja un archivo",
  }),
  methods: {
    analyze() {
      console.log(this.valid);
      this.validate();
      if (!this.valid || this.file === null) return;
      this.loading = true;
      setInterval(() => {
        this.loading = false;
        this.successData = true;
        this.title = "Resultados";
      }, 3000);
    },
    preview() {
      this.validate();
      if (!this.valid || this.file === null) return;
      this.loading = true;
      var reader = new FileReader();
      // Use the javascript reader object to load the contents
      // of the file in the v-model prop
      reader.readAsText(this.file);
      reader.onload = () => {
        console.log(reader);
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
          (msg) => !msg.includes("se unió a través de un enlace de invitación")
        );
        result2 = result1.filter((msg) => !msg.includes("Añadiste a "));
        let final = result2.filter(
          (msg) => !msg.includes("Cambió tu código de seguridad con")
        );
        final.map((val) => {
          console.log(val);
          const splitting = val.split(":");
          console.log(splitting);
          const usertime = splitting[0] + ":" + splitting[1];
          let dateuser = usertime.split("-");
          splitting.shift();
          splitting.shift();
          const message = {
            date: dateuser[0],
            user: dateuser[1].substr(1),
            message: splitting.join(":"),
          };
          this.messages.push(message);
        });
        this.loading = false;
      };
    },
    validate() {
      this.$refs.form.validate();
    },
  },
};
</script>

<style>
</style>