<template>
  <v-card class="mx-auto" width="95%" flat>
    <v-row>
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
      <v-col cols="12" md="6" v-for="(step, index) in steps" :key="index">
        <Steps>
          <v-img :src="step.image"></v-img>
          <template v-slot:title>
            {{ step.text }}
          </template>
          <template v-slot:text>
            {{ step.description }}
          </template>
        </Steps>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import Steps from "@/components/Steps.vue";
export default {
  components: {
    Steps,
  },
  props: [],
  data: () => ({
    steps: [
      {
        text: "Fist step",
        description: "This is a description",
        image: "https://picsum.photos/1920/1080?random",
      },
      {
        text: "Second step",
        description: "This is a description",
        image: "https://picsum.photos/1920/1080?random",
      },
      {
        text: "Third step",
        description: "This is a description",
        image: "https://picsum.photos/1920/1080?random",
      },
      {
        text: "Fourth step",
        description: "This is a description",
        image: "https://picsum.photos/1920/1080?random",
      },
    ],
  }),
};
</script>

<style>
</style>