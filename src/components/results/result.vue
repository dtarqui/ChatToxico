<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-img
            :src="
              color == 'red' || color == 'yellow'
                ? 'https://www.marketingdirecto.com/wp-content/uploads/2019/09/toxico.jpg'
                : 'https://hidrogel.com.mx/wp-content/uploads/2016/08/toxicidad-300x284.jpg'
            "
            height="150px"
          />
          <v-card-text class="text-center">
            {{ result(color) }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" v-if="more">
        <!-- <v-progress-linear :value="value" :color="color" height="20" rounded>
          {{ value | roundPercentage }}
        </v-progress-linear> -->
        <p>Personalidad de la persona:</p>
        <v-progress-linear
          v-for="(value, i) in data"
          :key="i"
          :value="value.data * 100"
          height="20"
          :color="value.name ? value.name : 'yellow'"
          rounded
        >
          {{ value.name }} en un {{ value.data | roundPercentage }}
        </v-progress-linear>
        <br />
        <v-data-table
          :headers="headers"
          :items="data"
          class="elevation-5"
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
    more: {
      type: Boolean,
      default: false,
    },
    user: {
      type: String,
      default: "",
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
  mounted() {
    console.log(this.data);
  },
  methods: {
    result(res) {
      if (res == "red") {
        return "Este usuario " + this.user + "es una persona toxica";
      }
      if (res == "green") {
        return "Este usuario " + this.user + "no es una persona toxica";
      }
      if (res == "grey") {
        return "Este usuario " + this.user + "no es una persona toxica";
      }
      if (res == "yellow") {
        return "Este usuario " + this.user + "es una persona toxica";
      }
    },
  },
};
</script>