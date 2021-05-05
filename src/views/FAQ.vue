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
              {{ faq.answer }}
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    faqs: [],
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