<template>
  <v-container>
    <!-- <v-col cols="12" sm="6" md="6"> -->
    <v-data-table
      :headers="headers"
      :items="data"
      class="elevation-1"
      hide-default-footer
    ></v-data-table>
    <!-- </v-col>  -->
  </v-container>
</template>
<script>
export default {
  props: ["headers", "data"],
  data: () => ({}),
};
</script>