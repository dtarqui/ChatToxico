<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-expansion-panels inset multiple>
          <v-expansion-panel>
            <v-toolbar color="primary">
              <v-toolbar-title class="white--text flex text-xs-center">
                Preguntas más frecuentes
              </v-toolbar-title>
            </v-toolbar>
          </v-expansion-panel>
          <v-expansion-panel v-for="(faq, i) in faqs" :key="i">
            <v-expansion-panel-header>
              {{ faq.question }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-card flat v-for="(answer, i) in faq.answer" :key="i">
                <v-card-text>
                  {{ answer.answer }}
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col cols="12">
        <v-card color="primary" dark>
          <v-card-title>Exportando tu chat de WhatsApp</v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" v-for="(step, index) in steps" :key="index">
        <Steps>
          <v-img :src="step.image" contain height="500px"></v-img>
          <template v-slot:title>
            {{ step.text }}
          </template>
          <template v-slot:text>
            {{ step.description }}
          </template>
        </Steps>
      </v-col>
      <v-col cols="12">
        <Steps>
          <template v-slot:title> Sobre nosotros </template>
          <template v-slot:text>
            El chat tóxico es un proyecto para poder determinar si una
            conversación entre 2 o más personas es tóxica, esto es una ventaja
            que puede ser utilizada de diferentes maneras, los cuales pueden ser
            desde el uso en el área de la psicología hasta el uso en la
            seguridad en la sociedad. Poder reconocer que una persona está
            enviando mensajes de una manera tóxica nos da la información
            suficiente para realizar las acciones correspondientes, ya sea
            eliminarlo del grupo, dejar de chatear con el/ella, etc. También se
            puede hacer un seguimiento de la conversación para fines de
            seguridad, ya sea identificando delincuentes o identificando el
            bullying.
          </template>
        </Steps>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import Steps from "../components/Steps.vue";
export default {
  components: {
    Steps,
  },
  data: () => ({
    faqs: [],
    steps: [
      {
        text: "Primer paso",
        description:
          "Selecciona el chat del que deseas exportar la conversacion",
        image: require("../assets/exportWhatsApp/Step1.jpg"),
      },
      {
        text: "Segundo paso",
        description:
          "Presiona el icono de tres puntos y se abrira un menu seis opciones",
        image: require("../assets/exportWhatsApp/Step2.jpg"),
      },
      {
        text: "Tercer paso",
        description:
          "Presiona la opcion de 'Mas' y obtendras otras opciones tal como se ve en la imagen",
        image: require("../assets/exportWhatsApp/Step3.jpg"),
      },
      {
        text: "Ultimo paso",
        description:
          "Por ultimo, una vez presionado la opcion de 'Exportar chat' aparecera una ventana nueva y deberas exportar el chat sin multimedia",
        image: require("../assets/exportWhatsApp/Step4.jpg"),
      },
    ],
  }),
  mounted() {
    this.getFaqs();
  },
  methods: {
    getFaqs() {
      axios.get("faq/list").then((res) => {
        console.log(res);
        this.faqs = res.data;
      });
    },
  },
};
</script>

<style>
</style>