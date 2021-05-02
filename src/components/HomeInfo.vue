<template>
  <!-- <v-container> -->
  <v-card
    class="mx-auto"
    width="70%"
    elevation="10"
    color="primary"
    :img="image"
  >
    <v-toolbar color="primary">
      <v-card-title class="white--text"
        ><slot name="title"></slot
      ></v-card-title>
    </v-toolbar>
    <v-img
      class="white--text align-end justify-center"
      height="250px"
      gradient="to top right, rgba(100,115,201,.7), rgba(70, 150, 84, 0.7)"
    >
      <v-col cols="12" md="8">
        <v-card-title><slot name="subtitle"></slot></v-card-title>
        <v-card-text>
          <slot></slot>
        </v-card-text>
      </v-col>
    </v-img>
  </v-card>
  <!-- </v-container> -->
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default: "https://picsum.photos/1920/1080?random",
    },
  },
};
</script>

<style>
</style>