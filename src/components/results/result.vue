<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        {{ result(color) }}
        <v-progress-linear :value="value" :color="color" height="20" rounded>
          {{ value | roundPercentage }}
        </v-progress-linear>
      </v-col>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="data"
          class="elevation-1"
          hide-default-footer
        >
          <template v-slot:no-data>
            Aun no se ha analizado los mensajes
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: {
    headers: {
      type: Array,
    },
    data: {
      type: Array,
    },
    value: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      default: "black",
    },
  },
  data: () => ({}),
  // watch: {
  //   data: {
  //     handler() {
  //       const max = this.maxNumber(
  //         this.data.positive,
  //         this.data.negative,
  //         this.data.neutral,
  //         this.data.mixed
  //       );
  //       this.value = max.value;
  //       this.color = max.color;
  //       console.log(max);
  //     },
  //     deep: true,
  //   },
  // },

  methods: {
    result(res) {
      if (res == "red") {
        return "Es toxico en un";
      }
      if (res == "green") {
        return "No es toxico";
      }
      if (res == "black") {
        return "Es neutral";
      }
      if (res == "yellow") {
        return "Es medio toxico";
      }
    },
  },
};
</script>